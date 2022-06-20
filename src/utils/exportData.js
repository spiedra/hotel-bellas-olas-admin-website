import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const exportToPdf = (headers, data, title, info) => {
  const unit = 'pt'
  const size = 'A4' // Use A1, A2, A3 or A4
  const orientation = 'landscape' // portrait or landscape

  const marginLeft = 40
  let marginY = 40
  // eslint-disable-next-line new-cap
  const doc = new jsPDF(orientation, unit, size)
  doc.setFontSize(15)
  // convertToBase64File((file)=>{
  //     doc.addImage(file, 'JPEG', 10, 100, 150, 76);
  //     console.log(file);
  // });

  doc.text(title, marginLeft, marginY)
  if (info !== undefined) {
    info.forEach(element => {
      doc.text(element, 40, marginY += 25)
    })
  }

  const content = {
    headStyles: { fillColor: '#000C66' },
    startY: marginY + 10,
    head: headers,
    body: data
    //   didDrawPage: (data) =>{
    //     doc.addImage(base64String,'JPEG',data.settings.margin.left,15,10,10)
    //   }
  }
  doc.autoTable(content)
  doc.save(title + '.pdf')
}
