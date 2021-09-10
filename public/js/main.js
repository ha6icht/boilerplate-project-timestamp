const submitButton = document.getElementById('submit-button');
const inputDate = document.getElementById('input-date');
const codeInsert = document.getElementById('code-insert');

//const dateValue = inputDate.value;
//console.log(dateValue);

const renderError = response => {
  codeInsert.innerHTML = `Your request returned an error from the server: 
<br>Code: ${response.status}<br>
${response.statusText}`;
}
const renderUnix = (milUnix) => {
    codeInsert.innerHTML = `{'unix': ${milUnix}}`
}
const myHeaders = new Headers();

submitButton.addEventListener('click',(e)=>{
  const dateValue = inputDate.value;
  console.log(dateValue);
  e.preventDefault();
  console.log('submit');
  fetch(`/api?date=${dateValue}`,{
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  }).then(res =>{
    if(res.ok){
      console.log('res.ok')
      return res.json();
    } else{
      renderError(res);
    }
  }).then(res =>{
    console.log('res.unix');
      renderUnix(res.unix);
  })
})