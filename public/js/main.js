const submitButton = document.getElementById('submit-button');
const inputDate = document.getElementById('input-date');
const codeInsert = document.getElementById('code-insert');
const radioButton = document.getElementsByClassName('radio-button')

//const dateValue = inputDate.value;
//console.log(dateValue);

const renderError = response => {
  codeInsert.innerHTML = `Your request returned an error from the server: 
<br>Code: ${response.status}<br>
${response.statusText}`;
}
let render = (form, milUnix) => {
    codeInsert.innerHTML = `{${form}: ${milUnix}}`
}
const myHeaders = new Headers();

/*radioButton.addEventListener('click', (e)=>{
  console.log(radioButton.value);
});*/

submitButton.addEventListener('click',(e)=>{
  let radioValue;
  if(radioButton[0].checked) radioValue = radioButton[0].value;
  else if(radioButton[1].checked) radioValue = radioButton[1].value;
  else console.log('No radio button chosen!!!!')
  console.log(radioValue);
  const checked = inputDate.value !== ''? true: false;
  e.preventDefault();
  console.log('submit');
  if(checked){
    const dateValue = inputDate.value+':'+radioValue;
    console.log(dateValue);
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
      //console.log(res.unix);
      
      if('unix' in res){
        console.log('unix');
        render('unix', res.unix);
      }
      else if('utc' in res){
        console.log('utc');
        render('utc', res.utc);
      }
    });
  } else{
    codeInsert.innerHTML = 'Please, choose a date.'
    console.log('No date chosen!')
  }
});