import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toast from "react-hot-toast";
import baseAPI from "../Api/baseApi"
import { useSelector, useDispatch} from "react-redux";
import { FetchPostAction  } from "../Redux/actionCreators/postAction";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function Deletemodal({modalOpen, setModalOpen, postID, setPostID}) {
    const auth = useSelector((state) => state.auth)
    const dispatch= useDispatch();
    
    const handleDelete= async ()=>{
        if (postID){
            let toastID= toast.loading("deleting post......", {position: "top-center", style: { color: "#0E4E48" }});
            try{
              const response= await baseAPI.delete(`/blog/post/${postID}/`, {headers: {"Authorization": `Bearer ${auth.token}`}});
              dispatch(FetchPostAction())
              toast.dismiss(toastID)
              toast.success("Post deleted successfully")
              setModalOpen(false)
            }
            catch(err){
              toast.dismiss(toastID)
              toast.error("post not deleted")
            }
        }
    }

    const handleCancelButtonClick= ()=>{
        setModalOpen(false)
        setPostID("")
    }

    const handleOutsideModalClick= ()=>{
        setModalOpen(false)
        setPostID("")
    }

    return (
        <>
        <Modal open={modalOpen} onClose={handleOutsideModalClick} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Typography id="modal-modal-title" className="text-[#999A9A]" variant="h6" component="h2">
                Are you sure you want to delete this post
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                    <div onClick={handleDelete} className="flex justify-center border rounded-[29px]  bg-[#F64141] text-[white] px-4 py-2 cursor-pointer">Delete</div>
                    <div onClick={handleCancelButtonClick} className="flex justify-center mt-2 cursor-pointer">Cancel</div>
                </div>
            </Typography>
        </Box> 
        </Modal>
        </>
    )
}

export default Deletemodal