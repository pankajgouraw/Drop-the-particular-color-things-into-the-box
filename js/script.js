$(function() {
    let index = 0;
    let quest = '';

    // url value
    let url = window.location.href;
    if (url.indexOf('?') > 0) {
        let params = new URLSearchParams(url.substring(1));
        index = parseInt(params.get('qno'));
        console.log("url variable available....");
    } else {
        console.log("url variable not available...");
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
            accept: ".blue",
            tolerance: 'intersect',
            drop: function(event, ui) {
                $(ui.draggable).fadeOut();
                beepAudio('audio/beep.mp3');
            }
        });

    } //end here drag and drop 

    dragDrop();


    let loadData = function(){
      let otherImages = data[index].otherImages;
      let activityImages = data[index].activityImages;
      let colorName = data[index].colorName;

       $.each(otherImages, function(i,value){
        let img = ` <img src='img/${value}' class="questionBox drag">`;
        quest = quest + img ;
       }) 

       $.each(activityImages, function(i,value){
        let img = ` <img src='img/${value}' class="questionBox drag ${colorName}">`;
        quest = quest + img ;
       }) 
   
    }  // end load data function

    loadData();
        console.log(quest);

    let beepAudio = function(music) {
        let audio = new Audio(music);
        audio.play();
    } //end play audio function



    $('#next').click(function() {
        index++;
        let url2 = window.location.pathname;
        var newurl = url2 + `?data=all&qno=${index}`;
        window.location.href = newurl;
    }); // for next


    $('#prev').click(function() {
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


}); // end document ready function