let healObj = new Heal(heal.offsetTop,heal.offsetLeft,heal.offsetWidth,heal.offsetHeight,heal)
    let show = true;
    let delay = true;
    let delayTimer = 0;
    function setdelay(){
      let time = setTimeout(function delayTime(){
          delayTimer+=10
          console.log(delayTimer)
          if(delayTimer>=500){
            delayTimer = 0;
            delay=true;
          }
          setTimeout(delayTime,50) 
        },50)
    }
    
    setTimeout(function produce(){
      //  && delay
      if(healObj===null){
        let h = document.createElement('div')
        h.classList.add('heal')
        stage.appendChild(h);
        h.style.top=randomHealer('top')+'px'
        h.style.left=randomHealer('left')+'px'
        healObj = new Heal(h.offsetLeft,h.offsetTop,h.offsetWidth,h.offsetHeight,h)
        show = true;
      }
      setTimeout(produce,50)
    },50)
    setTimeout(function healer(){
      // delay&&
      if(show&&Math.sqrt((Math.pow((heroObj.hero_cX()-healObj.heal_cX()),2)+ Math.pow((heroObj.hero_cY()-healObj.heal_cY()),2))<=(heroObj.width+healObj.width)/2)){
        healObj.object.remove()
        healObj=null
        show=false;
        // delay=false;
        // setdelay();
      }
      setTimeout(healer,50)
    },50)