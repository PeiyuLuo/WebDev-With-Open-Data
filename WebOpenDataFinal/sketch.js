$( window ).load(function() {
 for (i=0; i < 24; i++){
      emailCounts.push(0);
      if (i<10){
        hhh[i] = "0" + i.toString();
      }
      else{
        hhh[i] = i.toString();
      }
    }
for (i=1; i<31; i++){
  var timeOption
  if (i<10){
    timeOption = '2016-04-0' + i;
  }
  else{
    timeOption = '2016-04-' + i;
  }
  $('#selectTag').append('<option value="'+timeOption+'">'+timeOption+'</option>');
}
for (i=1; i<5; i++){
  var timeOption
  if (i<10){
    timeOption = '2016-05-0' + i;
  }
  else{
    timeOption = '2016-05-' + i;
  }
  $('#selectTag').append('<option value="'+timeOption+'">'+timeOption+'</option>');
}

getInfo();
}); //end window.load

function getInfo(){
  $( "#dataviz" ).empty();
  for (i=0; i < 24; i++){
      emailCounts[i]=0;}
  $.ajax({
       url : "dates3.txt",
       dataType: "text",
       success : loaded
   });
}

 var hhh = [];
 var emailCounts = [];

 function loaded(text) {
    console.log($('#selectTag').val());
    // var day = "2016-05-03";
    var day = $('#selectTag').val();
    var dates = text.split('\n');    
    var emailCount = [];

     for(i=0; i<dates.length; i++){
        var d= dates[i].slice(0,10);
        if (d == day){
            var h= dates[i].slice(11,13);
              // console.log(d);
              // console.log(h);
            for (j=0; j<24; j++){
                if (h === hhh[j]){
                  emailCounts[j]++;
                }
            }
        }///end if d == day;

     } //end for i< dates.length

  console.log(emailCounts);
  for (i=0; i<24; i++){
      barHeight = emailCounts[i]* 20 + 1;
      var svgContainer = d3.select('#dataviz').append('svg')
                                              .attr('width',50)
                                              .attr('height',330)     
                                              .on('mouseover',function(){
                                                    d3.select(this)
                                                      .select('rect')
                                                      .attr('fill','#f26112');
                                                    d3.select(this)
                                                      .select('text')
                                                      .attr('font-size','13px')
                                                      .attr('fill','#f26112')
                                                  })
                                              .on('mouseout',function(){
                                                    d3.select(this)
                                                      .select('rect')
                                                      .attr('fill','#0b6b8b');
                                                    d3.select(this)
                                                      .select('text')
                                                      .attr('font-size','10px')
                                                      .attr('fill','#e9e9e9')
                                                  });

      svgContainer.append('rect')
                  .attr('height', barHeight)
                  .attr('width',48)
                  .attr('fill','#0b6b8b')
                  .attr('y',function(d){
                    return 300 - barHeight;
                  });
      if (i<12){
      hoursText = i + 'am';
      }
      else if (i == 12){
        hoursText = '12pm';
      }
      else{
        hoursText = (i-12) + 'pm'; 
      }
      svgContainer.append('text')
                  .attr('y',function(){
                    return 290-barHeight}
                    )
                  .attr('x', 20)
                  .attr('font-size', '10px')
                  .attr('fill','#e9e9e9')
                  .text(emailCounts[i]);

      svgContainer.append('text')
                  .attr('y',320)
                  .attr('x', 0)
                  .attr('font-size', '10px')
                  .text(hoursText);
      }
 }

