const inputEL = document.getElementById("input");
const infoEL = document.getElementById("info");
const meaningcontainerEl = document.getElementById("meaningcontainer") ;
const titleEl=document.getElementById("title");
const meaningEl=document.getElementById("Meaning");
const audioEl=document.getElementById("audio");

async function fetchapi(word) {
  try {
    infoEL.style.display = "block";
    meaningcontainerEl.style.display = "none";
    infoEL.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    if(result.title){
      meaningcontainerEl.style.display = "block"; 
      infoEL.style.display = "none";
      titleEl.innerText= word;
      meaningEl.innerText = "N/A";
      audioEl.style.display="none";
    } else{
      infoEL.style.display = "none";
    meaningcontainerEl.style.display = "block"; 
    audioEl.style.display="inline-flex"
    titleEl.innerText=result[0].word;
    meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
    audioEl.src=result[0].phonetics[0].audio;
    }   
    
  } catch (error) {
    console.log(error);
    infoEL.innerText='an Error Occured';
  }
}

inputEL.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchapi(e.target.value);
  }
});
