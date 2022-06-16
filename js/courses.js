$(document).ready(function($){

    requestCampusList(function(campuslist)
    {
        campuslist.forEach(function(campusitem)
        {
            requestCourseList(campusitem.Codigo, function(courselist)
            {
                courselist.forEach(function(courseitem)
                {
                    requestStructureList(courseitem.Codigo, function(structlist)
                    {
                        const structitem = structlist[structlist.length-1];
                        addCourseToTable(courseitem.Codigo, courseitem.Nome, campusitem.Apelido, structitem.PeriodoInicio, structitem.PeriodoFim);
                    });
                });
            });
        });
    });    
});

function addCourseToTable(_id, _name, _campus, _structbegin, _structend)
{
    let table = document.getElementById("courses-table");
    
    let row = table.insertRow();
    
    row.className = "clickable-table-row"
    row.onclick = function(){
        window.document.location = "subjects.html?course="+_id+"&begin="+_structbegin+"&end="+_structend;
    };
    
    let idcell = row.insertCell(0);
    let namecell = row.insertCell(1);
    let campuscell = row.insertCell(2);
    
    idcell.innerHTML = _id;
    namecell.innerHTML = _name;
    campuscell.innerHTML = _campus;
}
