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