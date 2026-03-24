import home from "./home.js"
import register, { handleRegistrationBind } from "./register.js"
const login=()=>{
    return `
    <div class="login-page">
        <form>
            <h1>Login</h1>
            <div>
                <input type="email" name="email" placeholder="Email">
                <span><i class="fa-solid fa-envelope"></i></span>
            </div>
            <div>
                <input type="password" name="password" placeholder="Password">
                <span><i class="fa-solid fa-key"></i></span>
            </div>
            <div>
                <input type="checkbox" name="remember" id="remember">
                <label for="remember">remember me</label>

                <a href="" class="forgot-link">Forgot Me?</a>
            </div>
            <div>
                <button id="submit">Submit</button>
            </div>
            <div style="align-items: center; justify-content: center; color: black; font-weight: 600; ">
                Dont Have an account? <a href="#" id="register-link">Register</a>
            </div>
        </form>
    </div>
    `
}

export let handelLoginbind=()=>{
        const state={
  setState(name,value){
    this[name]=value
  }
}
const form=document.querySelector('form')
const inputs=document.querySelectorAll('input')

document.querySelector('#register-link').addEventListener('click', (e) => {
    e.preventDefault()
    history.pushState({}, "", "/register")
    root.innerHTML = register()
    handleRegistrationBind()
})

function handelChnage(e){
    let {name,value}=e.target
    state.setState(name,value)
}
function handelSubmit(e){
    e.preventDefault()
    let {email,password}=state    
    let payload={email,password};
    console.log(payload);

(async()=>{
   try {
     let res=await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
            "Content-Type":"application/json"
        }
        })
        console.log(res);
        let data=await res.json()
        console.log(data);
        if(res.status==200){
            alert(`${data.message}`)
            history.pushState({},"","/home")
            root.innerHTML=home()
        }else{
           alert(`${data.message}`)

        }   
   } catch (error) {
    console.log(error);
    alert("Something went wrong")
    
   }
    
    
})()

}

inputs.forEach(input=>{
    input.addEventListener('change',handelChnage)
})

form.addEventListener('submit',handelSubmit)
}

export default login;