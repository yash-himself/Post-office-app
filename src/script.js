
const ipAddressbox = document.getElementById('ipAddress')
const getIpbtn = document.getElementById('btn')



getIpbtn.addEventListener('click',()=>{
    fetch("https://api.ipify.org?format=json")
.then(response=> response.json())
.then(data=> {ipAddressbox.innerText=`Your IP Adress is: ${data.ip}`;sessionStorage.setItem('ip' , data.ip) })
.catch(err=> console.log(err))



    window.location.href='./src/home.html'
})



