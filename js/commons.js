function openGithub()
{
    const url = "https://github.com/FilipeChagasDev/UFMT-Matriz-Curricular";
    window.open(url, '_blank').focus();
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
            + " Entre as possível causas deste problema, estão:" 
            + " (1) conexão do usuário com a internet indisponível ou instável;" 
            + " (2) sistema da UFMT fora do ar;"
            + " (3) a versão em produção do sistema da UFMT é incompatível;"
            + " (4) falha interna do sistema da UFMT."
            + " Caso o problema persista, reporte em um <i>issue</i> no repositório deste projeto no Github."
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
