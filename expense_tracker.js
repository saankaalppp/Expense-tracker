
var form = document.getElementById('myForm')
let amt = document.getElementById('expenseAmt')
let desc = document.getElementById('description')
let categ=document.getElementById('expense')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    var obj = {
        amount: amt.value,
        description: desc.value,
        category:categ.value
    }
    document.getElementById('myForm').reset()

    var stringObj=JSON.stringify(obj);
    localStorage.setItem(obj.amount,stringObj);
    addExpense(obj);
   
})

function addExpense(ex) {
    var itemlist = document.getElementById('items');
    
    var li = document.createElement('li');
    li.className = 'list-group-item';
    
    li.appendChild(document.createTextNode(`${ex.amount}₹ - ${ex.description} (${ex.category})`));

    //edit btn
    var edbtn=document.createElement('input');
    edbtn.type="button"
    edbtn.value='edit'
    edbtn.className='editbtn';

    edbtn.addEventListener('click',(edit_event)=>{
        document.getElementById('expenseAmt').value = ex.amount;
        document.getElementById('description').value = ex.description;
        document.getElementById('expense').value = ex.category;

        li.remove();
    })
    
    //delete btn
    var delbtn=document.createElement('input');
    delbtn.type="button"
    delbtn.value='delete'
    delbtn.className='deletebtn';

    delbtn.addEventListener('click',(del_event) =>{
        localStorage.removeItem(ex.amount);
        li.remove();
    })
    
    li.append(edbtn)
    li.append(delbtn)
    
    itemlist.append(li)
    
}  
Object.keys(localStorage).forEach((key) => {
    stringObj = localStorage.getItem(key);
    var detailsOfExpense = JSON.parse(stringObj);    
    addExpense(detailsOfExpense);
});
