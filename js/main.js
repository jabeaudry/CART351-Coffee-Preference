body = document.getElementsByClassName("body");

//set html and css function

$(document).ready(function(){
    //var
    var selectedOunce;
    var selectedMug;
    var selectedMilk;
    var selectedSugar;
    var selectedTemp;
    var finalInt;  //end result: int assigned only when input is truly valid
    //html
 let containerInput = $("<div>");
    $(containerInput).appendTo(body);

    //text prompting the user to pick a day
    let userPrompt = $("<div>");
    userPrompt.text("Which day do you wish to view? ");
    $(userPrompt).appendTo(containerInput);

    //text box 
    let textBox = $("<input>");
    $(textBox).prop("type", "text");
    $(textBox).appendTo(containerInput);

    //search button
    let searchBtn = $("<input>");
    $(searchBtn).prop({"type": "button", "value":"Search!"});
    $(searchBtn).appendTo(containerInput);

    //error paragraph
    let errorPar = $("<div>");
    $(errorPar).text("");
    $(errorPar).appendTo(body);

    //result display + children
    let resultDisplay = $("<div>");
    $(resultDisplay).attr("class","resultDisplay");
    $(resultDisplay).appendTo(".body");
    
    let displayOunce = $("<div>");
    $(displayOunce).attr("class","resultBox");
    $(displayOunce).appendTo(".resultDisplay");  
    
    let displayMilk = $("<div>");
    $(displayMilk).attr("class","resultBox");
    $(displayMilk).appendTo(".resultDisplay");


    let displaySugar = $("<div>");
    $(displaySugar).attr("class","resultBox");
    $(displaySugar).appendTo(".resultDisplay");

    let displayTemp = $("<div>");
    $(displayTemp).attr("class","resultBox");
    $(displayTemp).appendTo(".resultDisplay");

    let displayMug = $("<div>");   
    $(displayMug).attr("class","resultBox");
    $(displayMug).appendTo(".resultDisplay");

    

    //css
    $(body).css({"width": "100%", "background-color":"#fff7d9"
                , "overflow": "hidden", "height": "100%",
                    "display": "inline"});
    $(containerInput).css({"width":"50%",
                    "margin": "auto",
                    "margin-top": "5%",
                    "display": "flex",
                    "flex-direction:": "row",
                    "justify-content": "space-around"
                    });
    $(userPrompt).css({"font-family": "sans-serif", "color": "#261d14", "font-size":"1.1em"});
    $(errorPar).css({"width": "100%",
                     "margin": "auto",
                     "margin-top":"3%",
                     "padding":"1%",
                     "text-align": "center",
                     "color": "#141c29",
                     "font-size": "2em",
                     "background-color":"#fff9ed"
                    });
    $(resultDisplay).css({"min-width":"100%",
                        "display": "flex",
                        "flex-direction": "row",
                        "flex-grow": "1",
                        "height": "auto",
                        "text-align": "center",
                        "justify-content": "space-around"

    });
    $(".resultBox").css({
        "height":"100%",
        "padding-top": "15%",
        "padding-bottom": "15%",
        "text-align": "center",
        "width": "20%"
});
    $(searchBtn).click(function() {
        $(resultDisplay).css("opacity", "0%");
        $(errorPar).text(""); // resets the error paragraph
        let searchDay = $(textBox).val();        //search box input
        var parseDay;    //variable used to parse int
               

        parseDay = parseInt(searchDay);         //searchDay string to an int

    
        if (0 < parseDay && parseDay < 5){
            finalInt = parseDay;       //if input is between 1 and 4
            console.log(finalInt);
            $(resultDisplay).css("opacity", "100%");
            loadCoffee();
            $(errorPar).text("On that day, I enjoyed a coffee in the following fashion...");
        }
        else {
            $(errorPar).text("Error: please enter a number between 1 and 4.");
        }
    })
      
    function loadCoffee() {
        $.getJSON('js/coffee.json', function(data) {
                JSONValue = data;
                let myCoffee = data["Coffee"];
                $.each(data, function (index, value){
                    myCoffee.push(value);
                })
                //this following part was found on the website:
                // https://www.encodedna.com/jquery/read-json-file-push-data
                //-into-array-and-convert-to-html-table-using-jquery.html
                var oneCoffee = [];
                for (var i = 0; i < myCoffee.length; i++){
                 for (var key in myCoffee[i]) {
                    if (oneCoffee.indexOf(key)===-1){
                        oneCoffee.push(key);
                    }
                 }
                }
                //ends here
                for (var i = 0; i < data.length; i++){
                    myCoffee.push(data[i].myCoffee);
                }
                //prints out selected coffee traits
                selectedMilk = (myCoffee[finalInt-1].Milk).toString();
                $(displayMilk).text(selectedMilk);
                selectedSugar = (myCoffee[finalInt-1].Sugar).toString();
                $(displaySugar).text(selectedSugar);
                selectedTemp = (myCoffee[finalInt-1].Temp).toString();
                $(displayTemp).text(selectedTemp);
                selectedMug = (myCoffee[finalInt-1].Mug).toString();
                $(displayMug).text(selectedMug);
                selectedOunce = (myCoffee[finalInt-1].Ounces).toString();
                $(displayOunce).text(selectedOunce);
            //background selection
            if (selectedMilk == "almond milk"){
                $(displayMilk).css({"background-color":"#a1814c", "color": "#e3cfba", "font-size":"2em"});
            }
            if (selectedMilk == "vanilla soy milk"){
                $(displayMilk).css({"background-color":"#d1bc5c", "color": "#6e6540", "font-size":"2em"});
            }
            if (selectedMilk == "no milk"){
                $(displayMilk).css({"background-color":"#1c0a06", "color": "#f3f5c1", "font-size":"2em"});
            }
            if (selectedOunce == "8 ounces"){
                $(displayOunce).css({"background-color":"#6b451c", "color": "#eddeb4",
                 "font-size":"2em", "padding-bottom": "8%"});
            }
            if (selectedOunce == "10 ounces"){
                $(displayOunce).css({"background-color":"#6b451c", "color": "#eddeb4",
                 "font-size":"2em", "padding-bottom": "20%"});
            }
            if (selectedTemp == "really hot"){
                $(displayTemp).css({"background-color":"#c94e10", "color": "#f5ac2c", "font-size":"2em"});
            }
            if (selectedTemp == "piping hot"){
                $(displayTemp).css({"background-color":"#8c1608", "color": "#f5ac2c", "font-size":"2em"});
            }
            if (selectedTemp == "lukewarm"){
                $(displayTemp).css({"background-color":"#f5cb33", "color": "#bd4926", "font-size":"2em"});
            }
            if (selectedSugar == "no sugar"){
                $(displaySugar).css({"background-color":"#1f1f1f","padding-bottom": "10%", "color": "#f7f7f7", "font-size":"2em"});
            }
            if (selectedMug == "in a blue mug"){
                $(displayMug).css({"background-color":"#5594a3", "color": "#becbcf", "font-size":"2em"});
            }

            if (selectedMug == "in a polar bear print mug"){
                $(displayMug).css({"background-color":"#dbd6c1", "color": "#45423e", "font-size":"2em"});
            }
            if (selectedMug == "in a Game of Thrones mug"){
                $(displayMug).css({"background-color":"#0d0c0c", "color": "#ffcd19", "font-size":"2em"});
            }
        }).fail(function(){
                console.log("Error: JSON has not loaded");
        }).done(function(){   //if the JSON was valid, this will execute and assign the objects inside the array
              console.log("JSON has loaded!");  
        });
    
       
    }
    
})





