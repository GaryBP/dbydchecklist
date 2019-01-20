/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";

var conn = $.hdb.getConnection();
var query = "SELECT FROM dbydchecklist.db.data::dbydchecklist.Question { " +
	        " QID as \"QuestionCode\", " +
            " VERSION as \"Version\", " +
            " QUESTION as \"Question\", " +
            " DESCRIPTION as \"Description\", " +
            " USAGE as \"Usage\" " +
            " } ";
var rs = conn.executeQuery(query);

var body = "";
for(var question of rs){
   if(question.Amount >= 500){
	body += question.QuestionCode + "\t" +
			question.Version + "\t" + 
			question.Question + "\t" + 
			question.Description + "\t" + 
			question.Usage + "\n";
   }
}

$.response.setBody(body);
$.response.contentType = "application/vnd.ms-excel; charset=utf-16le";
$.response.headers.set("Content-Disposition",
		"attachment; filename=Excel.xls");
$.response.status = $.net.http.OK;

