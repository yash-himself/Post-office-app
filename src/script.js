
const ipAddressbox = document.getElementById('ipAddress')
const getIpbtn = document.getElementById('btn')




    fetch("https://api.ipify.org?format=json")
.then(response=> response.json())
.then(data=> {ipAddressbox.innerText=`Your IP Adress is: ${data.ip}`;sessionStorage.setItem('ip' , data.ip) })
.catch(err=> console.log(err))

getIpbtn.addEventListener('click',()=>{

    window.location.href='./src/home.html'
})



