const form=document.getElementById('generate-form') //get elemnt by its id defined
const qr=document.getElementById('qrcode')
const onGenerateSubmit=(e)=>{
    e.preventDefault();
    clearUI();
    const url=document.getElementById('url').value;
    const size=document.getElementById('size').value;
    if(url==''){
        alert('Please enter a valid URL');
    }
    else{
      showSpinner();
    //  setting time duration for printing the spinner
      setTimeout(()=>{
          hideSpinner();
          generateQRCode(url,size);
            // Wait briefly to ensure the QR code image is loaded before getting its src
          setTimeout(()=>{
            const saveUrl=qr.querySelector('img').src;
            createSaveBtn(saveUrl);

          },50);
      },1000); //hide Spinner after 1 sec
    
    }
} ; 

const showSpinner=()=>{
    document.getElementById('spinner').style.display='block';
}; //it is for using the spinner
const hideSpinner=()=>{
    document.getElementById('spinner').style.display='none';
};  //it is for hiding the spinner

const generateQRCode =(url,size)=>{
    const qrcode=new QRCode('qrcode',{
        text:url,
        width:size,
        height:size,
    });
}; //it deals with what should be done while gnerating

const clearUI=()=>{
    qr.innerHTML='';
    const saveLink=document.getElementById('save-link');
    if(saveLink) saveLink.remove();

}; //FOR CLEARING THE UI MTLB AGAR EK QR CREATE KRDIYA 
// FIRUSKE BAAD NAYA QR CREATE KROGE TOH PURA HATNA CHIYE NA

//cretae save button

const createSaveBtn=(saveUrl)=>{
    const link =document.createElement('a');
    link.id='save-link';
    link.classList='bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href=saveUrl;
    link.download='qrcode';
    link.innerHTML='Save Image';
    document.getElementById('generated').appendChild(link);
    
};
hideSpinner();
form.addEventListener('submit',onGenerateSubmit);