$(document).ready(function($){
    buildCoursesTable();
    
    document.getElementById('search-input').onchange = function()
    {   
        buildCoursesTable();
    };

    document.getElementById('search-button').onclick = function()
    {   
        buildCoursesTable();
    };
});

function buildCoursesTable()
{
    const searchstring = document.getElementById('search-input').value.toUpperCase();

    console.log(searchstring);

    clearCoursesTable();

    requestCampusList(function(campuslist)
    {
        campuslist.forEach(function(campusitem)
        {
            requestCourseList(campusitem.Codigo, function(courselist)
            {
                courselist.forEach(function(courseitem)
                {
                    if(searchstring === '' || courseitem.Nome.toUpperCase().includes(searchstring))
                    {
                        let courserow = addRowToTable();

                        requestStructureList(courseitem.Codigo, function(structlist)
                        {
                            const structitem = structlist[structlist.length-1];
                            addCourseToTable(courserow, courseitem.Codigo, courseitem.Nome, campusitem.Apelido, structitem.PeriodoInicio, structitem.PeriodoFim);
                        });
                    }
                });
            });
        });
    });
}

function clearCoursesTable()
{
    let table = document.getElementById("courses-table");
    table.innerHTML = "";
}

function addRowToTable()
{
    let table = document.getElementById("courses-table");
    return table.insertRow();
}

function addCourseToTable(row, _id, _name, _campus, _structbegin, _structend)
{
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
