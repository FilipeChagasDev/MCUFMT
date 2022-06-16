$(document).ready(function($){

    requestCampusList(function(campuslist)
    {
        campuslist.forEach(function(campusitem)
        {
            requestCourseList(campusitem.Codigo, function(courselist)
            {
                courselist.forEach(function(courseitem)
                {
                    if(courseitem.Codigo == getSelectedCourse())
                    {
                        setCourseTitle(courseitem.Nome, campusitem.Apelido, getSelectedStructureBegin(), getSelectedStructureEnd());

                        requestSubjectList(courseitem.Codigo, getSelectedStructureBegin(), getSelectedStructureEnd(), function(subjectlist)
                        {
                            console.log(subjectlist);
                            subjectlist.ListaDisciplinas.forEach(function(subjectitem)
                            {
                                console.log(subjectitem);
                                addSubjectToTable(subjectitem);
                            });
                        });
                    }
                });
            });
        });
    });    
});

function setCourseTitle(title, campus, structbegin, structend)
{
    let titleheading = document.getElementById("course-title");

    if(structend == "99999") structend = "Atualmente";

    titleheading.innerHTML = 
        "<b>Curso:</b> " + title + "</br>" 
        + "<b>Campus:</b> " + campus + "</br>"
        + "<b>Estrutura:</b> " + structbegin + " - " + structend;
}

function addSubjectToTable(subjectitem)
{
    const subjectid = subjectitem.Codigo;
    const subjecttype = subjectitem.Tipo;
    const subjectname = subjectitem.Descricao;
    const subjectsemester = subjectitem.Semestre;
    const teorichours = subjectitem.CargaHorariaTeorico;
    const practhours = subjectitem.CargaHorariaPratica;

    let table = document.getElementById("subject-table");
    
    let row = table.insertRow();
    
    row.className = "clickable-table-row"
    row.onclick = function(){
        //TODO
        //window.document.location = "disciplinas.html?course="+_id+"&begin="+_structbegin+"&end="+_structend;
    };
    
    let idcell = row.insertCell(0);
    let semestercell = row.insertCell(1);
    let namecell = row.insertCell(2);
    let typecell = row.insertCell(3);
    let thcell = row.insertCell(4);
    let phcell = row.insertCell(5);

    idcell.innerHTML = subjectid;
    
    if(subjectsemester != "99")
        semestercell.innerHTML = subjectsemester;

    namecell.innerHTML = subjectname;
    typecell.innerHTML = subjecttype;
    thcell.innerHTML = teorichours;
    phcell.innerHTML = practhours;
}

function getURLParam(param)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function getSelectedCourse()
{
    return getURLParam('course');
}

function getSelectedStructureBegin()
{
    return getURLParam('begin');
}

function getSelectedStructureEnd()
{
    return getURLParam('end');
}