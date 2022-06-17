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

/**
 //Calculates the Damerau-Levenshtein distance between two strings.
 //Source: https://gist.github.com/IceCreamYou/8396172
 
 function distanceDamerauLevenshtein(source, target) {
    if (!source) return target ? target.length : 0;
    else if (!target) return source.length;

    var m = source.length, n = target.length, INF = m+n, score = new Array(m+2), sd = {};
    for (var i = 0; i < m+2; i++) score[i] = new Array(n+2);
    score[0][0] = INF;
    
    for (var i = 0; i <= m; i++) {
        score[i+1][1] = i;
        score[i+1][0] = INF;
        sd[source[i]] = 0;
    }

    for (var j = 0; j <= n; j++) {
        score[1][j+1] = j;
        score[0][j+1] = INF;
        sd[target[j]] = 0;
    }

    for (var i = 1; i <= m; i++) {
        var DB = 0;
        for (var j = 1; j <= n; j++) {
            var i1 = sd[target[j-1]],
                j1 = DB;
            if (source[i-1] === target[j-1]) {
                score[i+1][j+1] = score[i][j];
                DB = j;
            }
            else {
                score[i+1][j+1] = Math.min(score[i][j], Math.min(score[i+1][j], score[i][j+1])) + 1;
            }
            score[i+1][j+1] = Math.min(score[i+1][j+1], score[i1] ? score[i1][j1] + (i-i1-1) + 1 + (j-j1-1) : Infinity);
        }
        sd[source[i-1]] = i;
    }
    return score[m+1][n+1];
}

function sortStringsBySimilarity(stringarray, targetstring)
{
    return stringarray.map((x, i)=>({'idx': i, 'dist': distanceDamerauLevenshtein(x, targetstring)}))
                      .sort((a, b)=>(a.dist - b.dist))
                      .map((x, i)=>(stringarray[x.idx]));
}
*/