export default class Modelbills{
   url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRo3tnEshW6H-V2IDLWiGo7JydVcLfjbDtcDkyu4skIiBg4tLCX1lomdS4eQ8LpueWT-ck6J6Tq4-4D/pub?gid=0&single=true&output=tsv'

  loadData(){
    return fetch(this.url).then(res => res.text())
  }

  parseData(data){
    const tableData = data.split('\r\n').map(item => item.split('\t'))
    const names = tableData.shift()
 
    const formatData = tableData.map(el => {
        const billGuy = {}
        names.forEach((name,i) => billGuy[name] = el[i])
 
        return billGuy
        
    })

    this.formatData = formatData
    this.names = names

    return {
       formatData,
       names
    }
 
    // renderData(formatData,names)
 }
}