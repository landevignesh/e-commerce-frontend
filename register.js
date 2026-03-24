import login, { handelLoginbind } from "./login.js"
const register=()=>{
    return `
      <div class="registration-page">
        
        <form action="" style="padding-bottom: 20px; height:520px;">
            <h1>Register</h1>
            <div>
                <input type="text" name="name" placeholder="Name">
                <span><i class="fa-solid fa-signature"></i></span>
            </div>
            <div>
                <input type="email" name="email" placeholder="Email">
                <span><i class="fa-solid fa-envelope"></i></span>
            </div>
            <div>
                <input type="password" name="password" placeholder="Password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$">
                <span><i class="fa-solid fa-key"></i></span>
            </div>
            <div>
                <input type="password" name="re-password" placeholder="Re-Type Password">
                <span><i class="fa-solid fa-key"></i></span>
            </div>
            <div>

                <textarea name="address" placeholder="Address"></textarea>
                <span><i class="fa-solid fa-location-dot"></i></span>
            </div>
            <div>
                <input type="file" accept=".png,.jpg" id="fileinput" name="profileImage">
            </div>
            <div>
                <button id="submit">Submit</button>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; color: black; font-weight: 600;">
              Already Have an account? <a href="#" id="login-link">Login</a>
          </div>
        </form>
    </div>
    `
}
export let handleRegistrationBind=()=>{

const state={
  setState(name,value){
    this[name]=value
  }
}
const form=document.querySelector('form')
const inputs=document.querySelectorAll('input')
const textArea=document.querySelector('textarea')

document.querySelector('#login-link').addEventListener('click', (e) => {
    e.preventDefault()
    history.pushState({}, "", "/login")
    root.innerHTML = login()
    handelLoginbind()
})

function handelChnage(e){
let {name,value,files}=e.target
  if(name=="profileImage"){
    value=files[0]
    const reader=new FileReader()
reader.onload=function(){
  form.style.backgroundImage=`url(${reader.result})`
}
reader.readAsDataURL(value)
state.setState(name,value)
  }else{
  state.setState(name,value)

  }

}
function checkPassword(e){
    let {name,value}=e.target
    if(name=='re-password'){
      // console.log(e.target.parentElement)
      state.password!=value?e.target.parentElement.style.borderBottom="3px solid red": e.target.parentElement.style.borderBottom="3px solid black"
    }
    else{
       return
    }
}



function handelSubmit(e){
e.preventDefault()
// console.log(state);  
let {name,email,password,address,profileImage}=state
if(!name||!email||!password||!address||!profileImage){
  alert("All Feilds are mandatory")
  return
}

// console.log(password,state);
// console.log(state["re-password"])
if(password!=state["re-password"]){
  
  alert("password and re-passsword should match")
  return
}
// console.log(state);

let payload={email,password,profileImage,address,name}
console.log(payload);
let formData=new FormData()
for(let data in payload){
  formData.append(data,payload[data])
};

(async()=>{
try {
    let res=await fetch("http://localhost:5000/api/auth/register",{
    method:"POST",
    body:formData
  })
  console.log(res);
  let data=await res.json()
  if(res.status==201){
  alert(`${data.message}`)
  }else{
    alert(`${data.message}`)
  }


} catch (error) {
  console.log(error);
  alert("Something went wrong")
}

})();   

}

form.addEventListener('submit',handelSubmit)
inputs.forEach(input=>{
  input.addEventListener('change',handelChnage)
    input.addEventListener('input',checkPassword)
})
textArea.addEventListener('change',handelChnage)
}

export default register;