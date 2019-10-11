$(function() {
    let index = 0;
    let quest = '';
    let x = 2; // To check all images dragged or not.

    // url value
    let url = window.location.href;
    if (url.indexOf('?') > 0) {
        let params = new URLSearchParams(url.substring(1));
        index = parseInt(params.get('qno'));
        // console.log("url variable available....");
    } else {
        // console.log("url variable not available...");
    }

    $('.headerText').text(data[index].activityTitle);
    $('.headerText, .instruction').css({
        'color': headerInstructionColor
    });
    $('.instruction').text(data[index].activityDesc);




    // function for drag and drop

    function dragDrop() {
        $('.drag').draggable({
            revert: 'invalid',
            snapMode: 'inner'
              
        });

        $(".drop").droppable({
            accept: "."+data[index].colorName,
            tolerance: 'intersect',
            drop: function(event, ui) {
                $(ui.draggable).fadeOut();
                beepAudio('audio/welldone.mp3');
                if(data[index].activityImages.length >= x ){
                  // console.log(x);
                  x++;
                }else{
                  console.log('Congrates..');
                  $('.congrates').show();
                  x++;
                }
            }
        });

    } //end here drag and drop 

// to suffle the position of images at random places
  let imgRandPosition = function(){
    let questionBox = $('.questionBox');
    $.each(questionBox, function(i, value){
      $(this).css({order: Math.floor(Math.random() * questionBox.length) +1});
    })
  }


    let loadData = function(){
      let otherImages = data[index].otherImages;
      let activityImages = data[index].activityImages;
      let colorName = data[index].colorName;

       $.each(otherImages, function(i,value){
        let img = ` <img src='img/${value}' class="questionBox drag animated zoomIn">`;
        quest = quest + img ;
       }) 

       $.each(activityImages, function(i,value){
        let img = ` <img src='img/${value}' class="questionBox drag ${colorName} animated zoomIn">`;
        quest = quest + img ;
       })

       $('.questionContainer').html(quest); 
   
    }  // end load data function

    console.log(quest);

    let beepAudio = function(music) {
        let audio = new Audio(music);
        audio.play();
    } //end play audio function

    $('.congrates h4').click(function(){
      location.reload();
    })

    $('#next').click(function() {
        if(data[index].activityImages.length+2 > x){
          $('.info').show();
          setTimeout(function(){
            $('.info').hide();
          },3000)
          return false;
        }
        index++;
        let url2 = window.location.pathname;
        var newurl = url2 + `?data=all&qno=${index}`;
        window.location.href = newurl;
    }); // for next


    $('#prev').click(function() {
        if(data[index].activityImages.length+2 > x){
          $('.info').show();
          setTimeout(function(){
            $('.info').hide();
          },3000)
          return false;
        }
        index--;
        let url2 = window.location.pathname;
        var newurl = url2 + `?data=all&qno=${index}`;
        window.location.href = newurl;
    }); // for prev

    if (index > 0) {
        $('#prev').fadeIn();
        $('#next').fadeIn();
    } else {
        $('#prev').hide();
    }

    if (index == data.length - 1) {
        $('#next').hide();
    }


    loadData();
    dragDrop();
    imgRandPosition();

   



}); // end document ready function