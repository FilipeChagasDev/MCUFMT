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
                            subjectlist.ListaDisciplinas.forEach(function(subjectitem)
                            {
                                console.log(subjectitem);
                                addSubjectToTable(subjectitem);
                                addSubjectModal(subjectitem);
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

    if(parseInt(subjectsemester) % 2 == 0)
        row.style.backgroundColor = "rgb(240, 240, 240)";
    else if(parseInt(subjectsemester) == 99)
        row.style.backgroundColor = "rgb(240, 255, 240)";

    row.className = "clickable-table-row"
    row.setAttribute("data-toggle", "modal");
    row.setAttribute("data-target", "#exampleModal");

    row.onclick = function(){
        $("#modal"+subjectid).modal("show");
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

function addSubjectModal(subjectitem)
{
    const subjectid = subjectitem.Codigo;
    const subjecttype = subjectitem.Tipo;
    const subjectname = subjectitem.Descricao;
    const subjectsemester = subjectitem.Semestre;
    const teorichours = subjectitem.CargaHorariaTeorico;
    const practhours = subjectitem.CargaHorariaPratica;

    let prerequisites = ""
    if(subjectitem.ListaPrequisitos.length > 0)
    {
        prerequisites = "<b>Pré-requisitos:</b></br><ul>"
        subjectitem.ListaPrequisitos.forEach(function(requisiteitem)
        {
            prerequisites += "<li>" + requisiteitem.Descricao + "</li>"
        });
        prerequisites += "</ul>" 
    }

    const modalhtml = `
    <div class="modal fade" id="modal${subjectid}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        ${subjectname}
                    </h5>
                </div>
                <div class="modal-body">
                  <b>Tipo: </b> ${subjecttype} </br>
                  <b>Semestre: </b> ${subjectsemester} </br>
                  <b>Carga horária teórica: </b> ${teorichours} </br>
                  <b>Carga horária prática: </b> ${practhours} </br>
                  ${prerequisites}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="$('#modal${subjectid}').modal('hide')">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    let mydiv = document.createElement('div');
    mydiv.innerHTML = modalhtml;
    document.body.appendChild(mydiv);
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