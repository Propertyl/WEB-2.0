export default class Viewbills{
 DOM_TABLE = document.querySelector('.bill-container table')
   renderData({formatData,names}){
    const html = `
      ${this.getTableHead(names)}
      <tbody>
      ${this.getTableBody(formatData)}
      </tbody
    `
    this.DOM_TABLE.innerHTML = html
   }

   getTableHead([n,fio,date,bill]){
    return `
    <thead>
          <tr>
            <th scope="col">${n}</th>
            <th scope="col">${fio}</th>
            <th scopre="col">${date}</th>
            <th scope="col">${bill}</th>
          </tr>
    </thead>`
  }

  getTableBody(data) {
    return data.map(({ "№": n, "ФІО": fio, "Дата займу": date, "Борг": bill }) => {
      return `<tr>
        <th scope="row">${n}</th>
        <td>${fio}</td>
        <td>${bill}</td>
        <td>${date}</td>
      </tr>`;
    }).join('');  
  }
 
}