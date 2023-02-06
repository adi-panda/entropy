(function(thisObj) {

  // Any code you write here will execute before the panel is built.
  
  buildUI(thisObj); // Calling the function to build the panel
  
  function buildUI(thisObj : any) {
  
  var windowName = "your script name";
  
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", windowName, undefined, {
            resizeable: true
       });
  
        // Write any UI code here. Note: myPanel is your window panel object. If you add groups, buttons, or other UI objects make sure you use myPanel as their parent object, especially if you are using the only ScriptUI panel builder.

        myPanel.text = "Randomize Positions"; 
        myPanel.orientation = "column";
        myPanel.alignChildren = "left";
        myPanel.preferredSize[0] = 240;
        myPanel.spacing = 8;
        myPanel.margins = 12;



        var group1 = myPanel.add("group", undefined, {name: "group1"});
        group1.orientation = "row";
        group1.alignChildren = "center";
        group1.margins = 0;

        var xButton = group1.add("checkbox", undefined, undefined, {name: "xButton"});
        xButton.text = "X";

        var yButton = group1.add("checkbox", undefined, undefined, {name: "yButton"});
        yButton.text = "Y";

        var zButton = group1.add("checkbox", undefined, undefined, {name: "zButton"});
        zButton.text = "Z";

        var group2 = myPanel.add("group", undefined, {name: "group2"});
        group2.orientation = "row";
        group2.alignChildren = "center";
        group2.margins = 0;

        var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 
            statictext1.text = "Z Depth: ";

        var edittext1 = group2.add("edittext", undefined, "Enter Depth: ", {name: "edittext"}); 
        
        var group3 = myPanel.add("group", undefined, {name: "group3"});
        group3.orientation = "row";
        group3.alignChildren = "center";
        group3.margins = 0;

        var statictext2 = group3.add("statictext", undefined, undefined, {name: "statictext2"});
        statictext2.text = "Radial Spread: ";

        var slider = group3.add("slider", undefined, undefined, undefined, undefined, {name: "slider"});
        slider.minvalue = 0.00;
        slider.maxvalue = 1;
        slider.value = 0.50;

        var button1 = myPanel.add("button", undefined, undefined, {name: "button1"}); 
        button1.text = "Randomize"; 



        button1.onClick = function() {
        app.beginUndoGroup("Randomize Positions");
            var depth = Number(edittext1.text);
            var spread = slider.value;
            var comp = app.project.activeItem; 
            if( (comp instanceof CompItem) ) {
                var layers = comp.selectedLayers;
                if(layers.length > 0) {
                    for(var i = 0; i < layers.length; i++) {
                      var position = layers[i].property("Position");
                        if(position instanceof Property) {
                          var Xposition = position.value[0];
                          var Yposition = position.value[1];
                          var Zposition = position.value[2];
                          if(isNaN(depth) && zButton.value){
                            alert("Please enter a depth!");
                            return;
                          }
                          if(xButton.value == true){
                            Xposition = (Math.random() * spread + (0.5 - spread / 2)) * comp.width;
                          }
                          if(yButton.value == true){
                            Yposition = (Math.random() * spread + (0.5 - spread / 2)) * comp.height;
                          }
                          if(zButton.value == true){
                            Zposition = Zposition + Math.random() * depth;
                          }
                          position.setValueAtTime(comp.time, [Xposition, Yposition, Zposition]);
                        }
                    }
                } else {
                    alert("Please select at least one layer");
                }
            }
        app.endUndoGroup();
        }
    
       if(myPanel instanceof Window) {
          myPanel.onResizing = myPanel.onResize = function() {
            this.layout.resize();
          };
        }

       if (myPanel instanceof Window) {
          myPanel.center();
          myPanel.show();
       } else {
          myPanel.layout.layout(true);
          myPanel.layout.resize();
       }
  
  }
  
  // Write your helper functions here
  
  })(this);


