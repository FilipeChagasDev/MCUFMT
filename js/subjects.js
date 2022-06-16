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
    titleheading.innerHTML = title + ", " + campus + ", estrutura " + structbegin + "-" + structend;
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

function request(parameters, callback) 
{
    $.ajax({
        url: 'https://academico-siga.ufmt.br/ufmt.matrizcurricular/api/busca?callback=?',
        cache: false,
        data: parameters,
        dataType: "json",
        timeout: 10000,
        mimeType: "application/json",
        success: function (data) { callback(data); },
        error: function() { 
            error_box = document.getElementById("error-box");
            error_box.innerHTML = 
            "<div class=\"alert alert-danger\" role=\"alert\">"
            + "Não foi possível se conectar ao sistema da UFMT para obter os dados."
            + "Entre as possível causas deste problema, estão:" 
            + "(1) conexão do usuário com a internet indisponível ou instável;" 
            + "(2) sistema da UFMT fora do ar;"
            + "(3) atualizações nos sistemas da UFMT."
            + "Caso o problema persista, reporte em um <i>issue</i> no repositório deste projeto no Github."
            + "</div>" 
        }
    });
}

function requestCampusList(callback)
{
    request({tipo: "campus"}, callback);
}

function requestCourseList(_campus, callback)
{
    request({tipo: 'curso', campus: _campus}, callback);
}

function requestStructureList(_course, callback)
{
    request({tipo: 'estrutura', curso: _course}, callback);
}

function requestSubjectList(_course, _structbegin, _structend, callback)
{
    request({tipo: 'disciplina', curso: _course, estruturaInicio: _structbegin, estruturaFim: _structend}, callback);
}
