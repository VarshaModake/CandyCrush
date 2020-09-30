document.addEventListener('DOMContentLoaded',()=>{
const grid=document.querySelector('.grid');
const width=8;
const squares=[];
const scoredisplay=document.getElementById('score')
let score=0;
const candyImages=[
   'url(images/red-candy.png) ',
   'url(images/blue-candy.png) ',
   'url(images/green-candy.png) ',
   'url(images/orange-candy.png) ',
   'url(images/purple-candy.png) ']

   function createboard()
   {
       for(let i=0;i<width*width;i++)
       {
           const square=document.createElement('div');
           square.setAttribute('draggable',true);
           square.setAttribute('id',i);
           let randomCandy=Math.floor(Math.random()*candyImages.length);
           square.style.backgroundImage=candyImages[randomCandy];
           grid.appendChild(square);
           squares.push(square);
       }
   }
   createboard();
   //drag candy
   let imageBingDraggrd;
   let imageBingReplaced;
   let squareBingDragged;
   let squareBingReplaced;

   squares.forEach(square=>square.addEventListener('dragstart',dragStart));
   squares.forEach(square=>square.addEventListener('dragend',dragEnd));
   squares.forEach(square=>square.addEventListener('dragover',dragOver));
   squares.forEach(square=>square.addEventListener('dragenter',dragEnter));
   squares.forEach(square=>square.addEventListener('dragleave',dragLeave));
   squares.forEach(square=>square.addEventListener('drop',dragDrop));

   function dragStart()
   {
    imageBingDraggrd=this.style.backgroundImage;
    squareBingDragged=parseInt(this.id);
    // console.log('dragstart');
   }

   
   function dragOver(e)
   {
       e.preventDefault();
    // console.log('dragover');

   }
   function dragEnter(e)
   {
       e.preventDefault();
    // console.log('dragenter');

   }
   function dragLeave()
   {
    // console.log('dragleave');

   }
   function dragDrop()
   {
       imageBingReplaced=this.style.backgroundImage;
       squareBingReplaced=parseInt(this.id);
       this.style.backgroundImage=imageBingDraggrd;
       squares[squareBingDragged].style.backgroundImage=imageBingReplaced;
    // console.log('dragdrop');

   }
   function dragEnd()
   {
    // console.log('dragend');
    let validMoves=[
        squareBingDragged -1,
        squareBingDragged-width,
        squareBingDragged+1,
        squareBingDragged+width
    ]
    let validMove=validMoves.includes(squareBingReplaced);
    
    if(validMove && squareBingReplaced)
    {
        squareBingReplaced=null;
    }
    else if(squareBingReplaced && (!validMove || squares[squareBingDragged].style.backgroundImage===''))
    {
        squares[squareBingReplaced].style.backgroundImage=imageBingReplaced;
        squares[squareBingDragged].style.backgroundImage=imageBingDraggrd;
    }
    else{
        squares[squareBingDragged].style.backgroundImage=imageBingDraggrd;

    }
    
   }
function MoveDown()
{ const firstRow=[0,1,2,3,4,5,6,7];
    for(let i=0;i<55;i++)
    {
        if(squares[i+width].style.backgroundImage==='')
        {
            squares[i+width].style.backgroundImage=squares[i].style.backgroundImage;
            squares[i].style.backgroundImage='';
        }
        if(firstRow.includes(i) && squares[i].style.backgroundImage==='')
        {
            const randonCandy=Math.floor(Math.random()*candyImages.length);
            squares[i].style.backgroundImage=candyImages[randonCandy];
        }
       
    }
}
   function checkRowForThree()
   {
       for(i=0;i<61;i++)
      {
          let rowOfThree=[i,i+1,i+2]
          let decidedImage=squares[i].style.backgroundImage;
          const isBlank=squares[i].style.backgroundImage===''
          const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55];
          if(notValid.includes(i))continue;
          if(rowOfThree.every(index=>squares[index].style.backgroundImage===decidedImage && !isBlank))
          {
              score+=3;
              scoredisplay.innerHTML=score;
              rowOfThree.forEach(index=>{squares[index].style.backgroundImage=''})
          }
      } 
   }

   function checkRowForFour()
   {
       for(i=0;i<61;i++)
      {
          let rowOfFour=[i,i+1,i+2,i+3]
          let decidedImage=squares[i].style.backgroundImage;
          const isBlank=squares[i].style.backgroundImage===''
          const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
          if(notValid.includes(i))continue;
          if(rowOfFour.every(index=>squares[index].style.backgroundImage===decidedImage && !isBlank))
          {
              score+=4;
              scoredisplay.innerHTML=score;
              rowOfFour.forEach(index=>{squares[index].style.backgroundImage=''})
          }
      } 
   }

   function checkColumnForThree()
   {
       for(i=0;i<47;i++)
      {
          let columnOfThree=[i,i+8,i+16]
          let decidedImage=squares[i].style.backgroundImage;
          const isBlank=squares[i].style.backgroundImage===''
          
          if(columnOfThree.every(index=>squares[index].style.backgroundImage===decidedImage && !isBlank))
          {
              score+=3;
              scoredisplay.innerHTML=score;
              columnOfThree.forEach(index=>{squares[index].style.backgroundImage=''})
          }
      } 
   }

   function checkColumnForFour()
   {
       for(i=0;i<39;i++)
      {
          let columnOfFour=[i,i+8,i+16,i+24]
          let decidedImage=squares[i].style.backgroundImage;
          const isBlank=squares[i].style.backgroundImage===''
          
          if(columnOfFour.every(index=>squares[index].style.backgroundImage===decidedImage && !isBlank))
          {
              score+=4;
              scoredisplay.innerHTML=score;
              columnOfFour.forEach(index=>{squares[index].style.backgroundImage=''})
          }
      } 
   }
  
   window.setInterval(()=>{
    MoveDown();
    checkColumnForFour();
    checkRowForFour();
    checkRowForThree();
    checkColumnForThree();
    
   },100);
  
   
})