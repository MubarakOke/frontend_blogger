const receipt= (order, logo)=>{
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
    mywindow.document.write(`<html lang="en">
                            <head>
                                <title>Order receipt</title>
                            </head>
                            <body>
                                <div style="margin:30px; font-family: sans-serif;">
                                    <div style="display: flex; justify-content: space-between; align-items:center; margin-bottom: 20px;">
                                        <div>
                                            <h1 style="color: #0E4E48">Order(s) Receipt</h1>
                                        </div>
                                        <div style="position:relative; right: -20px">
                                            <img src=${logo} alt="" width="110px" height="110px">
                                        </div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between;">
                                        <div style="display: flex; flex-direction: column;">
                                            <div style="font-weight:500; font-size: 20px; color: #0E4E48">Address</div>
                                            <div style="font-weight:lighter; width:100px">${order.address}</div>
                                        </div>
                                        <div style="display: inline-grid; text-align: right;">
                                            <div style="font-weight:500; font-size: 20px; margin-bottom: 2px; color: #0E4E48">Date</div>
                                            <div style="margin-bottom: 8px;">${order.date_completed}</div>
                            
                                            <div style="font-weight:500; font-size: 20px; margin-bottom: 2px; color: #0E4E48">Order number</div>
                                            <div>${order.id}</div>
                                        </div>
                                    </div>
                                    <div style="margin-top: 50px;">
                                        <table style="border-collapse: collapse; font-size: 18px; width: 100%">
                                            <tr>
                                                <th style="font-weight:500; border: 2px solid black; color: #0E4E48; text-align: left; padding: 10px">Name</th>
                                                <th style="font-weight:500; border: 2px solid black; color: #0E4E48; text-align: left; padding: 10px">Quantity</th>
                                                <th style="font-weight:500; border: 2px solid black; color: #0E4E48; text-align: left; padding: 10px">Price(#)</th>
                                            </tr>`)

    let stock= order.stock.map((value, id)=>{return (      
                                                `<tr>
                                                <td style="border: 2px solid black; padding: 10px">${value.name}</td>
                                                <td style="border: 2px solid black; padding: 10px">${value.quantity}</td>
                                                <td style="border: 2px solid black; padding: 10px">${value.price}</td>
                                                </tr>`)
                    })
    mywindow.document.write(`${stock.toString()}`)
    mywindow.document.write(`</table>
                            </div>
                            </div>
                            </body>
                            </html>`)
  
    mywindow.document.close();
    mywindow.focus();

    return mywindow
}

export default receipt;