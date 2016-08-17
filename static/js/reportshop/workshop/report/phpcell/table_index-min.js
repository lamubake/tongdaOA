function TCRSTable(d,c){this.tabId=d;this.column=c}function TCRSTableIndex(c,d){this.repId=d;this.curColumn=null;this.crsDataSet=c;TCRSDataRecord.call(this,this.crsDataSet,"crscell.crs_tableindex","id,sheetindex,label,tabletype,expandtype,initcz,ishidden","repid='"+this.repId+"'","position");this.columns=[];this.colSchemas={};this.listValues={};this.obj_new_row_kid=null;this.obj_loaded_row_kid=null;this.obj_deleted_row_kid=null;this.arr_tab_property=null;this.arr_tab_id=null;this.arr_cur_tab_name=null;this.arr_hidden_rows=null;this.arr_hidden_cols=null;this.arr_col_name_to_kid=null;this.arr_col_id_to_kid=null}TCRSTableIndex.prototype=new TCRSDataRecord();TCRSTableIndex.prototype.initColSchema=function(){this.loadData("#tablecrs_tableindex"+this.repId);if(!this.isEmpty()){var m=crsReport.s_cur_task;if(m==""){m=crsReport.s_begin_task}var l=this.first();while(!this.EOF()){if(l.initcz<1){l.initcz=1}var p=this.getColumn(l.id);if(p.i_init_cz!=l.initcz){p.i_init_cz=l.initcz}p.loadData("#tablecrs_columnindex"+l.id);if(!p.isEmpty()){var n=p.first();while(!p.EOF()){if(n.color==""){n.color=16}var k=getColPlatKId(n.kid);this.colSchemas[k]={};if(crsReport.openMode=="read"){var i=false}else{var i=true}if(n.readonly!="\u662f"&&n.has_inline_calcu=="y"){n.readonly="\u662f"}if(n.readonly=="\u662f"||n.datatype=="\u81ea\u52a8\u7f16\u53f7"||n.datatype=="\u81ea\u589e\u578b"){i=false}var o=true;if(n.ishidden=="\u662f"||l.ishidden=="\u662f"){if(n.ishidden!="\u662f"){n.ishidden="\u662f"}o=false;i=false}if(i&&crsReport.writeColList!=null&&$.inArray(n.kid,crsReport.writeColList)==-1){i=false}if(o&&crsReport.readColList!=null&&$.inArray(n.kid,crsReport.readColList)==-1){o=false}this.colSchemas[k].canread=o;this.colSchemas[k].canwrite=i;if((o||i)&&!crsReport.b_has_sign_seal&&n.datatype=="\u624b\u5199\u7b7e\u7ae0"){crsReport.b_has_sign_seal=true}if(l.tabletype=="\u4e3b\u8868"){if(o||i){if(n.datatype=="\u56fe\u7247\u578b"){if(p.arr_picture_cols==null){p.arr_picture_cols=[]}p.arr_picture_cols.push(n.kid)}else{p.arr_output_cols.push(p.cursor)}}else{if(p.arr_hidden_cols==null){p.arr_hidden_cols=[]}p.arr_hidden_cols.push(p.cursor)}}this.colSchemas[k].ismust=false;if(n.ismust=="\u662f"){this.colSchemas[k].ismust=true}else{if(n.ismust!=""){var j=n.ismust.split(",");if(j.indexOf(m)!=-1){this.colSchemas[k].ismust=true}}}this.colSchemas[k].id=n.id;this.colSchemas[k].kid=n.kid;this.colSchemas[k].tableid=n.tableid;this.colSchemas[k].datatype=n.datatype;this.colSchemas[k].displaystyle=n.displaystyle;this.colSchemas[k].codeid=n.codeid;this.colSchemas[k].display_rect=rectNameToIndex(n.cellspan);this.colSchemas[k].row_idx=this.cursor;this.colSchemas[k].col=p;this.colSchemas[k].col_idx=p.cursor;this.colSchemas[k].check_value=function(d){var b="";if(d==undefined||d==null||d==""||d.charAt(0)=="#"){return""}var e=this.col.rows[this.col_idx];if(e.datatype=="\u65e5\u671f\u578b"){var g="";var f="";var v="";var s="";if(d.indexOf(":")!=-1){var c=d.split(" ");var u=c[0].split("-");var h=c[1].split(":");g=h[0];f=h[1];v=h[2];s=h[3]}else{var u=d.split("-");g=0;f=0;v=0;s=0}if(u.length<2){u.push("00");u.push("00")}else{if(u.length<3){u.push("00")}}var a=Date.parse(u[1]+"/"+u[2]+"/"+u[0]+" "+g+":"+f+":"+v+"."+s);if(typeof a!="number"){b="\u3010"+e.columnlabel+"\u3011\u6307\u6807\u53ea\u5141\u8bb8\u8f93\u5165\u65e5\u671f\u578b\u6570\u636e\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u8f93\u5165\uff01"}}else{if(e.datatype=="\u6570\u503c\u578b"){if(d.search(/^[-]{0,1}[0-9]+[.]{0,1}[0-9]*[%]{0,1}$/g)==-1){b="\u3010"+e.columnlabel+"\u3011\u6307\u6807\u53ea\u5141\u8bb8\u8f93\u5165\u6570\u503c\u578b\u6570\u636e\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u8f93\u5165\uff01"}}else{if(e.datatype=="\u8d27\u5e01\u578b"){if(d.search(/^[-]{0,1}[0-9]+[.]{0,1}[0-9]*$/g)==-1){b="\u3010"+e.columnlabel+"\u3011\u6307\u6807\u53ea\u5141\u8bb8\u8f93\u5165\u8d27\u5e01\u578b\u6570\u636e\uff0c\u8bf7\u68c0\u67e5\u60a8\u7684\u8f93\u5165\uff01"}}}}return b};this.colSchemas[k].get_display_seq=function(c,a){var b=1;if(crsReport.crsTableIndex.rows[this.row_idx].tabletype=="\u660e\u7ec6\u8868"){var d=this.display_rect;if(crsReport.crsTableIndex.rows[this.row_idx].expandtype=="\u4e0d\u6269\u5c55"||crsReport.crsTableIndex.rows[this.row_idx].expandtype=="\u6309\u884c\u5411\u4e0b"){b=(a-d[0].y)/(d[1].y-d[0].y+1)+1}else{b=(c-d[0].x)/(d[1].x-d[0].x+1)+1}}return b};this.colSchemas[k].get_cell_point=function(b){var c={x:this.display_rect[0].x,y:this.display_rect[0].y};var a=crsReport.crsTableIndex.rows[this.row_idx];if(b>1&&a.tabletype=="\u660e\u7ec6\u8868"){if(a.expandtype=="\u6309\u884c\u5411\u4e0b"||a.expandtype=="\u4e0d\u6269\u5c55"){c.y+=(this.display_rect[1].y-this.display_rect[0].y+1)*(b-1)}else{c.x+=(this.display_rect[1].x-this.display_rect[0].x+1)*(b-1)}}return c};this.colSchemas[k].get_cell_rect=function(d){var b=[];b.push({x:this.display_rect[0].x,y:this.display_rect[0].y});b.push({x:this.display_rect[1].x,y:this.display_rect[1].y});var c=crsReport.crsTableIndex.rows[this.row_idx];if(d>1&&c.tabletype=="\u660e\u7ec6\u8868"){if(c.expandtype=="\u6309\u884c\u5411\u4e0b"||c.expandtype=="\u4e0d\u6269\u5c55"){var a=this.display_rect[1].y-this.display_rect[0].y+1;b[0].y+=a*(d-1);b[1].y+=a*(d-1)}else{var a=this.display_rect[1].x-this.display_rect[0].x+1;b[0].x+=a*(d-1);b[1].x+=a*(d-1)}}return b};if(n.radiogroup!=""&&n.datatype=="\u903b\u8f91\u578b"){if(p.arr_radio_group==undefined){p.arr_radio_group=[]}p.arr_radio_group.push(HandleMemoStr(n.radiogroup,false))}n=p.next()}}l=this.next()}}};TCRSTableIndex.prototype.getAColSchema=function(c){var d=getColPlatKId(c);return this.colSchemas[d]};TCRSTableIndex.prototype.getColumn=function(f){var h=0,g=this.columns.length;for(;h<g;h++){if(this.columns[h].tabId==f){break}}if(h>=g){var e=new TCRSColumnIndex(this.crsDataSet,f);this.columns.push(new TCRSTable(f,e));return e}else{return this.columns[h].column}};TCRSTableIndex.prototype.getFirstTable=function(){this.loadData("#tablecrs_tableindex");res=null;if(!this.isEmpty()){var c=this.first();while(!this.EOF()){if(c.ishidden!="\u662f"){this.curColumn=this.getColumn(c.id);res=[];res.push(c.tabletype=="\u4ea4\u53c9\u8868"?"\u4e3b\u8868":c.tabletype);res.push(c.sheetindex);res.push(c.expandtype);res.push(c.initcz);var d=this.curColumn.getRecordCount();if(d>c.initcz){c.initcz=d}res.push(d);res.push(this.curColumn.getColumnDefRect(c.expandtype));break}c=this.next()}}return res};TCRSTableIndex.prototype.getNextTable=function(){this.loadData("#tablecrs_tableindex");res=null;if(!this.isEmpty()){var c=this.next();while(!this.EOF()){if(c.ishidden!="\u662f"){this.curColumn=this.getColumn(c.id);res=[];res.push(c.tabletype=="\u4ea4\u53c9\u8868"?"\u4e3b\u8868":c.tabletype);res.push(c.sheetindex);res.push(c.expandtype);res.push(c.initcz);var d=this.curColumn.getRecordCount();if(d>c.initcz){c.initcz=d}res.push(d);res.push(this.curColumn.getColumnDefRect(c.expandtype));break}c=this.next()}}return res};TCRSTableIndex.prototype.GetFirstWritableCellList=function(i){var m=null;this.loadData("#tablecrs_tableindex");var o=true;if(!this.isEmpty()){var k=this.first();while(!this.EOF()){if(k.ishidden!="\u662f"){if(i!=null){for(var n=0,j=i.length;n<j;n++){var p=this.getColumn(k.id);var l=this.getAColSchema(i[n]);if(true||p==l.col){o=true;break}else{if(o){o=false}}}}if(o){break}}k=this.next()}if(k!=null){p=this.getColumn(k.id);this.curColumn=p;m=p.getWriteCellList(k,i)}}return m};TCRSTableIndex.prototype.GetNextWritableCellList=function(i){var m=null;this.loadData("#tablecrs_tableindex");var o=true;if(!this.isEmpty()){var k=this.next();while(!this.EOF()){if(k.ishidden!="\u662f"){if(i!=null){for(var n=0,j=i.length;n<j;n++){var p=this.getColumn(k.id);var l=this.getAColSchema(i[n]);if(true||p==l.col){o=true;break}else{if(o){o=false}}}}if(o){break}}k=this.next()}if(k!=null){p=this.getColumn(k.id);this.curColumn=p;m=p.getWriteCellList(k,i)}}return m};TCRSTableIndex.prototype.get_sheet_sz=function(){var d=1;this.loadData("#tablecrs_tableindex");if(!this.isEmpty()){var c=this.first();while(!this.EOF()){if(d<c.sheetindex){d=c.sheetindex}c=this.next()}}return d};TCRSTableIndex.prototype.loadCodeItem=function(A){var F=crsReport.crsCommon.get_row_seq(A);var B=this.getAColSchema(crsReport.crsCommon.get_cid_by_td(A));var s=this.rows[B.row_idx].label+B.col.rows[B.col_idx].columnlabel;var E="y."+F+"."+s+".";if(this.listValues[E]==undefined){E="n."+F+"."+s+".";if(this.listValues[E]==undefined){F=0;E="y."+F+"."+s+".";if(this.listValues[E]==undefined){E="n."+F+"."+s+".";if(this.listValues[E]==undefined){E=""}}}}if(E!=""&&this.listValues[E]!=undefined){if(this.listValues[E].data_list.length>0&&this.listValues[E].data_list[0].substr(0,5)=="<col>"){if(crsReport.func_show_list_view!=null){crsReport.func_show_list_view(this.listValues[E].data_list,E.substr(0,2)=="n.")}if(E.substr(0,2)=="n."){return}}else{var y='<select onchange="javascript:crsReport.change_handler(this);" style="position: absolute;left:'+i_l+"; top:"+i_t+";width:"+i_w+";height:"+i_h+';" id="'+$(A).attr("cid")+'"><option></option>';for(var z=0,v=this.listValues[E].data_list.length;z<v;z++){var u=(this.listValues[E].data_list[z]==val)?"selected":"";if(z==0){if(E.substr(0,2)=="y."){y+="<option value='<\u8f93\u5165...>'><\u8f93\u5165...></option>"}}y+="<option value='"+this.listValues[E].data_list[z]+"' "+u+">"+this.listValues[E].data_list[z]+"</option>"}y+="</select>";return y}}if(B.datatype=="\u4ee3\u7801\u578b"){if(B.codeid=="-10"){return'<form name="form1"style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+$(A).attr("cid")+'"><a href="javascript:;" class="orgAdd" onClick="SelectDept();">\u6dfb\u52a0</a>&nbsp;&nbsp;<a href="javascript:;" class="orgClear" onClick="ClearUser()">\u6e05\u7a7a</a>&nbsp;&nbsp;<a href="javascript:;" class="orgAdd" onClick="javascript:getName(this);">\u786e\u8ba4</a><input type="hidden" name="TO_ID" value=""><textarea style="height:'+i_h+";width:"+i_w+';" cols=20 name=TO_NAME rows=1 class="BigStatic" wrap="yes" readonly>'+val+"</textarea></form>"}else{if(B.codeid=="-11"){return'<form name="form1" style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';z-index:1;" id="'+$(A).attr("cid")+'"><a href="javascript:;" class="orgAdd" onClick="SelectUser(\'admin\',\'COPY_TO_ID\', \'COPY_TO_NAME\');">\u6dfb\u52a0</a>&nbsp;&nbsp;<a href="javascript:;" class="orgClear" onClick="ClearUser(\'COPY_TO_ID\', \'COPY_TO_NAME\')">\u6e05\u7a7a</a>&nbsp;&nbsp;<a href="javascript:;" class="orgAdd" onClick="javascript:getName(this);">\u786e\u8ba4</a><input type="hidden" name="COPY_TO_ID" value=""><textarea style="height:'+i_h+";width:"+i_w+';" cols=20 name="COPY_TO_NAME" rows=2 class="BigStatic" wrap="yes" readonly>'+val+"</textarea></form>"}else{if(parseInt(B.codeid)>0){var C=crsReport.crsCodeIndex.get_select(B.codeid,val);if(C==""){var f="";if(crsReport.crsCodeIndex.is_readonly(B.codeid)){f="readOnly"}return"<input "+f+' style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+getColPlatKId($(A).attr("cid"))+'" name="" size="20" class="BigInput" value="'+val+'" onClick="javascript:crsReport.crsCodeIndex.get_tree('+B.codeid+", '"+val+"', 0, 1, 0, '', '"+getColPlatKId($(A).attr("cid"))+'\');" onchange="javascript:crsReport.change_handler(this);">'}else{return'<select style="position: absolute;left:'+i_l+"; top:"+i_t+";width:"+i_w+';" id="'+$(A).attr("cid")+'" onchange="javascript:crsReport.change_handler(this);">'+C+"</select>"}}else{if(B.codeid!=""){var t=HandleMemoStr(B.codeid,false).split("|");var D="";for(var i=0,w=t.length;i<w;i++){if(i==0&&t[0]!=""){D+="<option value=''></option><option value='<\u8f93\u5165...>'><\u8f93\u5165...></option>"}var f=HandleMemoStr(t[i],false);if(f==val){D+="<option value='"+f+"' selected>"+f+"</option>"}else{D+="<option value='"+f+"'>"+f+"</option>"}}return'<select style="position: absolute;left:'+i_l+"; top:"+i_t+";width:"+i_w+';" id="'+$(A).attr("cid")+'" onchange="javascript:crsReport.change_handler(this);">'+D+"</select>"}}}}}else{if(B.datatype=="\u65e5\u671f\u578b"){if(B.displaystyle=="yyyy\u5e74"){return'<input style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+$(A).attr("cid")+'" name="" size="20" class="BigInput" value="'+val+'" onClick="WdatePicker({dateFmt:\'yyyy\'})" onchange="javascript:crsReport.change_handler(this);">'}else{if(B.displaystyle=="yyyy\u5e74mm\u6708"||B.displaystyle=="yyyy.mm"){var x=(B.displaystyle=="yyyy\u5e74mm\u6708")?"yyyy\u5e74MM\u6708":"yyyy.MM";return'<input style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+$(A).attr("cid")+'" name="" size="20" class="BigInput" value="'+val+'" onClick="WdatePicker({dateFmt:\''+x+'\'})"onchange="javascript:crsReport.change_handler(this);">'}else{if(B.displaystyle.indexOf(":")!=-1){return'<input style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+$(A).attr("cid")+'" name="" size="20" class="BigInput" value="'+val+'" onClick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss:ms\'})" onchange="javascript:crsReport.change_handler(this);">'}else{return'<input style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+$(A).attr("cid")+'" name="" size="20" class="BigInput" value="'+val+'" onClick="WdatePicker({dateFmt:\'yyyy-MM-dd\'})"onchange="javascript:crsReport.change_handler(this);">'}}}}else{if(B.datatype=="\u5b57\u7b26\u578b"){return'<textarea style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+A.cid+'"onchange="javascript:crsReport.change_handler(this);">'+val+"</textarea>"}else{if(B.datatype=="\u81ea\u589e\u578b"){}else{if(B.datatype=="\u903b\u8f91\u578b"){if($(A).attr("val")=="\u221a"){crsReport.crsCellControler.set_cell_value(A,"")}else{crsReport.crsCellControler.set_cell_value(A,"\u221a")}}else{if(B.datatype=="\u56fe\u7247\u578b"){if($(A).html()==""){return'<form name="form01" method="post" enctype= "multipart/form-data">\u8bf7\u9009\u62e9\u56fe\u7247<input style="position:absolute;margin-left:-220px;opacity:0;" type= "file" id="FILE1" accept="image/*" name="FILE1" onchange="javascript:crsReport.submit_picture(this);" /></form>'}}else{if(B.datatype=="\u9644\u4ef6\u578b"){if($(A).html()==""){return'<form name="form01" method="post" enctype= "multipart/form-data">\u8bf7\u9009\u62e9\u9644\u4ef6<input style="position:absolute;margin-left:-220px;opacity:0;" type= "file" id="FILE1" name="FILE1" onchange="javascript:crsReport.submit_attach(this);" /></form>'}}else{return'<input style="position: absolute;left:'+i_l+"; top:"+i_t+";height:"+i_h+";width:"+i_w+';" id="'+$(A).attr("cid")+'" name="" class="BigInput" value="'+val+'" onchange="javascript:crsReport.change_handler(this);">'}}}}}}}};TCRSTableIndex.prototype.get_col_kid_by_name=function(j,o){var l=j+"."+o;if(this.arr_col_name_to_kid!=null&&this.arr_col_name_to_kid[l]!=undefined){return this.arr_col_name_to_kid[l]}this.loadData("#tablecrs_tableindex");for(var n=0,k=this.rows.length;n<k;n++){if(this.rows[n].label==j){var m=this.getColumn(this.rows[n].id);m.loadData("#tablecrs_columnindex");for(var p=0,i=m.rows.length;p<i;p++){if(m.rows[p].columnlabel==o){if(this.arr_col_name_to_kid==null){this.arr_col_name_to_kid=[]}this.arr_col_name_to_kid[l]=m.rows[p].kid;return m.rows[p].kid}}break}}return""};TCRSTableIndex.prototype.get_col_kid_by_id=function(j,i){this.loadData("#tablecrs_tableindex");if(this.arr_col_id_to_kid!=null&&this.arr_col_id_to_kid[i]!=undefined){return this.arr_col_id_to_kid[i]}for(var m=0,k=this.rows.length;m<k;m++){if(this.rows[m].id==j){var l=this.getColumn(this.rows[m].id);l.loadData("#tablecrs_columnindex");for(var n=0,h=l.rows.length;n<h;n++){if(l.rows[n].id==i){if(this.arr_col_id_to_kid==null){this.arr_col_id_to_kid=[]}this.arr_col_id_to_kid[i]=l.rows[n].kid;return l.rows[n].kid}}break}}return""};TCRSTableIndex.prototype.get_col_id_by_col_kid=function(c){var d=this.getAColSchema(c);return d.id};TCRSTableIndex.prototype.get_tab_id_by_col_kid=function(c){var d=this.getAColSchema(c);return this.rows[d.row_idx].id};TCRSTableIndex.prototype.get_tab_id_by_name=function(d){var c=this.search("label",d);if(c!=null){return c.id}else{return -1}};TCRSTableIndex.prototype.get_cell_value=function(r,l,n,m){this.loadData("#tablecrs_tableindex");if(n==undefined){if(!this.isEmpty()){var j=this.first();while(!this.EOF()){var q=this.getColumn(j.id);q.loadData("#tablecrs_columnindex"+j.id);if(!q.isEmpty()){var o=q.first();while(!q.EOF()){if(r==o.kid){return q.get_raw_value(o.id,l)}o=q.next()}}j=this.next()}}}else{if(!m){r=this.get_tab_id_by_name(r)}var k=this.getColumn(r);var p=this.search("id",r);if(p.tabletype=="\u4ea4\u53c9\u8868"){}else{return k.get_cell_value(l,n,m,p,false)}}};TCRSTableIndex.prototype.get_cur_tab_name=function(d){this.loadData("#tablecrs_tableindex");var c=this.getColumn(d);return c.get_cur_tab_name()};TCRSTableIndex.prototype.get_tab_type_by_id=function(d){var c=this.search("id",d);if(c!=null){return c.tabletype}else{return""}};TCRSTableIndex.prototype.clear_values_on_list=function(d,f,e){if(this.listValues["y."+e+"."+d+f+"."]!=undefined){this.listValues["y."+e+"."+d+f+"."]=undefined}else{if(this.listValues["n."+e+"."+d+f+"."]!=undefined){this.listValues["n."+e+"."+d+f+"."]=undefined}}if(crsReport.b_as_form){}};TCRSTableIndex.prototype.clear_data_item=function(m){if(m==null||m.length<=0){return}var n=0,p=m.length/3;while(n<p){var i=m[n*3];if(i!=""){var l=this.search("label",i);if(l!=null){var j=this.getColumn(l.id);var o=n;var k=[];while(o<p){if(m[o*3]==i){k.push(m[o*3+1]);k.push(m[o*3+2]);m[o*3]=""}o++}j.clear_data_item(l,k)}}n++}};TCRSTableIndex.prototype.create_cur_table_data=function(b){return this.save_data(true,true,false,false,b)};TCRSTableIndex.prototype.reset_cell_color=function(k){if(k==null||k.length<=0){return}var n=0,p=k.length/3;while(n<p){var i=k[n*3];if(i!=""){var l=this.search("id",i);if(l!=null){var j=this.getColumn(l.id);var o=n;var m=[];while(o<p){if(k[o*3]==i){m.push(k[o*3+1]);m.push(k[o*3+2]);k[o*3]=""}o++}j.reset_cell_color(l,m)}}n++}};TCRSTableIndex.prototype.update_cell_refer=function(j,m,p,i,k){var n=this.cursor;if(!this.isEmpty()){var l=this.first();while(!this.EOF()){if(l.sheetindex==j){var o=this.getColumn(l.id);if(o!=null){o.update_cell_refer(p,k?"insert":"delete",i,m)}}l=this.next()}}this.cursor=n};TCRSTableIndex.prototype.get_first_data_item=function(){if(this.curColumn!=null){return this.curColumn.get_first_data_item()}return null};TCRSTableIndex.prototype.get_next_data_item=function(){if(this.curColumn!=null){return this.curColumn.get_next_data_item()}return null};TCRSTableIndex.prototype.save_data=function(aj,ah,Z,k,aa){var ag="";if(!k&&!aa&&(this.obj_new_row_kid!=null||this.obj_loaded_row_kid!=null)){if(!ah){if(this.obj_loaded_row_kid!=null){for(s_key in this.obj_loaded_row_kid){this.obj_loaded_row_kid[s_key].init()}}if(this.obj_new_row_kid!=null){for(s_key in this.obj_new_row_kid){this.obj_new_row_kid[s_key].init()}}}var ai=crsReport.get_valid_cur_task();var J=this;if(!ah){var S=[]}if(crsReport.b_as_form){if(!crsReport.crsTableIndex.isEmpty()){var Y=crsReport.crsTableIndex.first();while(!crsReport.crsTableIndex.EOF()){var ae,af,W;if(Y.tabletype=="\u4e3b\u8868"){ae="main_tab_"+Y.id;af="rid";W="cid"}else{ae="detail_tab_"+Y.id;af="id";W="aria-describedby"}var T=parseInt(Y.sheetindex)-1,X=1,R="";$("table[id^='"+ae+"'] tbody tr["+af+"] td["+W+"]").each(function(){var b=$(this).parent("tr").attr(af);if(Y.tabletype=="\u660e\u7ec6\u8868"){if(R!=""&&R!=b){X++}if(R!=b){R=b}}var g=$(this).attr(W);if(g.charAt(0)!="{"){var c=g.indexOf("{");if(c==-1){return true}g=g.substr(c)}if(b.charAt(0)!="{"||g.charAt(0)!="{"){return true}var n=J.getAColSchema(g),a="";var l=n.col.rows[n.col_idx];var h=n.get_cell_point(X);if(!aa){a=$(this).attr("val");if(a==undefined){a=$(this).children().eq(0).val();if(a==undefined){a=""}}if(a==""){a=$(this).attr("val2")}if(a==undefined){a=""}if(n.datatype=="\u624b\u5199\u7b7e\u7ae0"){var e=$.md5(getColPlatKId(b+g));a=crsReport.DWebSignSeal.GetStoreDataEx(e+"_hw;"+e+"_seal")}if(a==""){if(n.datatype=="\u56fe\u7247\u578b"){}else{if(n.datatype=="\u81ea\u52a8\u7f16\u53f7"&&crsReport.openMode=="write"){if(!ah){a=crsReport.crsAutoCode.get_next_autocode(l.codeid,false);if(a!=""){crsReport.crsCommon.set_cell_value(T,h.x,h.y,a)}}}else{if(n.datatype=="\u65e5\u671f\u578b"){}}}}else{if(n.datatype=="\u65e5\u671f\u578b"){if(n.displaystyle=="yyyy\u5e74"){a+="-01-01"}else{if(n.displaystyle=="yyyy\u5e74mm\u6708"||n.displaystyle=="yyyy.mm"){a+="-01"}}}else{if(n.datatype=="\u4ee3\u7801\u578b"){if(n.codeid=="-10"||n.codeid=="-11"){if($(this).children(":eq(1)").length>0){a=$(this).children(":eq(1)").val();if(a!=""&&a.charAt(a.length-1)==","){a=a.substr(0,a.length-1)}}}else{a=crsReport.crsCodeIndex.get_value_by_display_text(n.codeid,a)}}else{if(n.datatype=="\u5b57\u7b26\u578b"){if(n.displaystyle=="\u53bb\u7a7a\u683c\u53ca\u6362\u884c"){a=a.trim()}}else{if(n.datatype=="\u56fe\u7247\u578b"){var f=crsReport.arr_upload_files.indexOf(a);if(f!=-1){crsReport.arr_upload_files[f]=""}a+=" "+T+" "+Math.floor($(this).offset().left)+" "+Math.floor($(this).offset().top)+" "+Math.floor($(this).offset().left+$(this).width()-1)+" "+Math.floor($(this).offset().top+$(this).height()-1)+" "+h.x+" "+h.y}else{if(n.datatype=="\u9644\u4ef6\u578b"){a="{"+getColPlatKId(b+g)+"}_"+a;var f=crsReport.arr_upload_files.indexOf(a);if(f!=-1){crsReport.arr_upload_files[f]=""}}}}}}}}else{if(J.obj_loaded_row_kid==null||J.obj_loaded_row_kid[getColPlatKId(b)]==undefined){return true}a=$(this).attr("pval");if(a==undefined){a=""}}if(ah){if(a==""){if(n.datatype=="\u6570\u503c\u578b"||n.datatype=="\u8d27\u5e01\u578b"){a="null"}}n.col.obj_data_cache.add_cur_col_val(n.get_display_seq(h.x,h.y),g,a)}else{if(a!=""){var d=n.check_value(a);if(d!=""){if(ag.indexOf(d)==-1){ag+=d+"\n"}}}else{if(n.datatype=="\u6570\u503c\u578b"||n.datatype=="\u8d27\u5e01\u578b"){a="null"}}var m=null;if(J.obj_new_row_kid!=null){m=J.obj_new_row_kid[getColPlatKId(b)];if(m==undefined){m=null}}if(m==null){if(J.obj_loaded_row_kid!=null){m=J.obj_loaded_row_kid[getColPlatKId(b)];if(m==undefined){m=null}if(a!=$(this).attr("pval")&&(crsReport.writeColList==null||crsReport.writeColList.indexOf(g)!=-1)){m.update_col_value("col"+n.id,a)}}}m.add_col_value("col"+n.id,a,n.datatype=="\u81ea\u589e\u578b");if(crsReport.crsTableIndex.rows[n.row_idx].tabletype=="\u660e\u7ec6\u8868"){m.calc_display_seq(l.cellspan,crsReport.crsTableIndex.rows[n.row_idx].expandtype,h.x,h.y)}if(!ah&&a!=$(this).attr("pval")){S.push(T);S.push(h.x);S.push(h.y);S.push(a)}}});Y=crsReport.crsTableIndex.next()}}}else{$("table[id^='sheet'] td").each(function(){if($(this).attr("cid")!=undefined&&($(this).attr("rid")!=undefined||$(this).parent("tr").attr("rid")!=undefined)){var g=crsReport.crsCommon.crsTable.crsCellControler.get_sheet_index_by_cell($(this));var h=crsReport.crsCommon.crsTable.crsCellControler.get_cell_point($(this));var a=J.getAColSchema($(this).attr("cid")),b="",c="";c=$(this).parent("tr").attr("rid");if(c==undefined){c=$(this).attr("rid")}var l=a.col.rows[a.col_idx];if(!aa){b=$(this).attr("val");if(b==undefined){b=""}if(b==""){b=$(this).attr("val2")}if(b==undefined){b=""}if(a.datatype=="\u624b\u5199\u7b7e\u7ae0"){var e=$.md5(getColPlatKId(c+a.kid));b=crsReport.DWebSignSeal.GetStoreDataEx(e+"_hw;"+e+"_seal")}if(b==""){if(a.datatype=="\u56fe\u7247\u578b"){}else{if(a.datatype=="\u81ea\u52a8\u7f16\u53f7"&&crsReport.openMode=="write"){if(!ah){b=crsReport.crsAutoCode.get_next_autocode(l.codeid,false);if(b!=""){crsReport.crsCommon.set_cell_value(g,h.x,h.y,b)}}}else{if(a.datatype=="\u65e5\u671f\u578b"){}}}}else{if(a.datatype=="\u65e5\u671f\u578b"){if(a.displaystyle=="yyyy\u5e74"){b+="-01-01"}else{if(a.displaystyle=="yyyy\u5e74mm\u6708"||a.displaystyle=="yyyy.mm"){b+="-01"}}if(b!=""){b=b.replace(".","-")}}else{if(a.datatype=="\u4ee3\u7801\u578b"){if(a.codeid=="-10"){if($(this).children(":eq(1)").length>0){b=$(this).children(":eq(1)").val();if(b!=""&&b.charAt(b.length-1)==","){b=b.substr(0,b.length-1)}}}else{if(a.codeid=="-11"){if($(this).children(":eq(1)").length>0){b=$(this).children(":eq(1)").val();if(b!=""&&b.charAt(b.length-1)==","){b=b.substr(0,b.length-1)}}}else{b=crsReport.crsCodeIndex.get_value_by_display_text(a.codeid,b)}}}else{if(a.datatype=="\u5b57\u7b26\u578b"){if(a.displaystyle=="\u53bb\u7a7a\u683c\u53ca\u6362\u884c"){b=b.trim()}}else{if(a.datatype=="\u56fe\u7247\u578b"){var f=crsReport.arr_upload_files.indexOf(b);if(f!=-1){crsReport.arr_upload_files[f]=""}b+=" "+g+" "+Math.floor($(this).offset().left)+" "+Math.floor($(this).offset().top)+" "+Math.floor($(this).offset().left+$(this).width()-1)+" "+Math.floor($(this).offset().top+$(this).height()-1)+" "+h.x+" "+h.y}else{if(a.datatype=="\u9644\u4ef6\u578b"){b="{"+getColPlatKId(c+a.kid)+"}_"+b;var f=crsReport.arr_upload_files.indexOf(b);if(f!=-1){crsReport.arr_upload_files[f]=""}}}}}}}}else{if(J.obj_loaded_row_kid==null||J.obj_loaded_row_kid[getColPlatKId(c)]==undefined){return true}b=$(this).attr("pval");if(b==undefined){b=""}}if(ah){if(b==""){if(a.datatype=="\u6570\u503c\u578b"||a.datatype=="\u8d27\u5e01\u578b"){b="null"}}a.col.obj_data_cache.add_cur_col_val(a.get_display_seq(h.x,h.y),$(this).attr("cid"),b)}else{if(b!=""){var d=a.check_value(b);if(d!=""){if(ag.indexOf(d)==-1){ag+=d+"\n"}}}else{if(a.datatype=="\u6570\u503c\u578b"||a.datatype=="\u8d27\u5e01\u578b"){b="null"}}var m=null;if(J.obj_new_row_kid!=null){m=J.obj_new_row_kid[getColPlatKId(c)];if(m==undefined){m=null}}if(m==null){if(J.obj_loaded_row_kid!=null){m=J.obj_loaded_row_kid[getColPlatKId(c)];if(m==undefined){m=null}if(b!=$(this).attr("pval")&&(crsReport.writeColList==null||crsReport.writeColList.indexOf($(this).attr("cid"))!=-1)){m.update_col_value("col"+a.id,b)}}}m.add_col_value("col"+a.id,b,a.datatype=="\u81ea\u589e\u578b");if(crsReport.crsTableIndex.rows[a.row_idx].tabletype=="\u660e\u7ec6\u8868"){m.calc_display_seq(l.cellspan,crsReport.crsTableIndex.rows[a.row_idx].expandtype,h.x,h.y)}if(!ah&&b!=$(this).attr("pval")){S.push(g);S.push(h.x);S.push(h.y);S.push(b)}}}})}if(!ah){if(this.arr_tab_property==null){this.arr_tab_property=new Array(this.rows.length);for(var V=0,P=this.rows.length;V<P;V++){this.arr_tab_property[V]=new TCRSTableProperty()}for(V in this.colSchemas){var O=this.colSchemas[V].col.rows[this.colSchemas[V].col_idx];if(O.iskey=="\u662f"){if(crsReport.writeColList==null||crsReport.writeColList.indexOf(O.kid)!=-1||crsReport.readColList==null||crsReport.readColList.indexOf(O.kid)!=-1){this.arr_tab_property[this.colSchemas[V].row_idx].add_key_col(O)}}if(O.ismust=="\u662f"||O.ismust=="\u6240\u6709\u4efb\u52a1"||ai!=""&&O.ismust==ai){if(crsReport.writeColList==null||crsReport.writeColList.indexOf(O.kid)!=-1||crsReport.readColList==null||crsReport.readColList.indexOf(O.kid)!=-1){this.arr_tab_property[this.colSchemas[V].row_idx].add_must_col(O)}}if(O.isonly=="\u662f"){if(crsReport.writeColList==null||crsReport.writeColList.indexOf(O.kid)!=-1||crsReport.readColList==null||crsReport.readColList.indexOf(O.kid)!=-1){this.arr_tab_property[this.colSchemas[V].row_idx].add_only_col(O)}}}}for(var V=0,P=this.arr_tab_property.length;V<P;V++){this.arr_tab_property[V].init()}if(this.obj_loaded_row_kid!=null){for(V in this.obj_loaded_row_kid){if(this.obj_deleted_row_kid==null||this.obj_deleted_row_kid[V]==undefined){var U=this.obj_loaded_row_kid[V];this.arr_tab_property[U.obj_col_schema.row_idx].add_row(U)}}}if(this.obj_new_row_kid!=null){for(V in this.obj_new_row_kid){var U=this.obj_new_row_kid[V];this.arr_tab_property[U.obj_col_schema.row_idx].add_row(U)}}for(var V=0,P=this.arr_tab_property.length;V<P;V++){if(!this.arr_tab_property[V].do_check(V)){ag+=this.arr_tab_property[V].s_err_info}}crsReport.crsFormulasCache.execute_formulas(ai,"",0,"",0,"",true,false,false);if(crsReport.crsFormulasCache.s_info!=""){ag+=crsReport.crsFormulasCache.s_info;crsReport.crsFormulasCache.s_info=""}if(ag!=""){if(aj){aj=false}}}}if(aj){var L="";if(ah){for(var V=0,P=crsReport.crsTableIndex.columns.length;V<P;V++){var ad=crsReport.crsTableIndex.columns[V].column;if(!ad.b_do_create_cur_table){ad.b_do_create_cur_table=true}L+="drop TABLE IF EXISTS "+ad.obj_data_cache.s_cur_tab_name+";";L+=ad.obj_data_cache.s_cdef_column_list;if(aa){if(ad.obj_data_cache.rows!=null){var Q="";for(var I=0,ab=ad.obj_data_cache.rows.length;I<ab;I++){if(ad.obj_data_cache.rows[I][0]==""){continue}for(var i=0,ac=ad.obj_data_cache.rows[I].length;i<ac;i++){if(i==0){Q="'"+HandleMemoStr(ad.obj_data_cache.rows[I][i],false).replaceAll("'","#005C`'").replaceAll(";",CRSSep)+"'"}else{if(ad.obj_data_cache.rows[I][i]=="null"){Q+=",null"}else{Q+=",'"+HandleMemoStr(ad.obj_data_cache.rows[I][i],false).replaceAll("'","#005C`'").replaceAll(";",CRSSep)+"'"}}}L+="insert into "+ad.obj_data_cache.s_cur_tab_name+" values("+Q+");"}}}else{var N="'','','','"+crsReport.userId+"','"+crsReport.writeTime+"','','unchecked','n','n','"+crsReport.refKID+"'",K="";for(i in ad.obj_data_cache.obj_cur_rows){for(var j=1,ab=ad.obj_data_cache.obj_cur_rows[i].length;j<ab;j++){if(j==1){K=N+","+i.replace("d","")}if(ad.obj_data_cache.obj_cur_rows[i][j]=="null"){K+=",null"}else{K+=",'"+ad.obj_data_cache.obj_cur_rows[i][j].replaceAll("'","#005C`'").replaceAll(";",CRSSep)+"'"}}L+="insert into "+ad.obj_data_cache.s_cur_tab_name+"("+ad.obj_data_cache.columnList.replaceAll(";",",")+")values("+K+");"}ad.obj_data_cache.end_add_cur_col_val()}}}else{if(this.obj_deleted_row_kid!=null){for(V in this.obj_deleted_row_kid){if(this.obj_loaded_row_kid!=null&&this.obj_loaded_row_kid[V]!=undefined){L+="delete from crscell.crs_tabledata"+this.rows[this.obj_loaded_row_kid[V].obj_col_schema.row_idx].id+" where kid='"+getColRealKId(V)+"';"}}}if(this.obj_loaded_row_kid!=null){for(V in this.obj_loaded_row_kid){if(this.obj_deleted_row_kid==null||this.obj_deleted_row_kid[V]==undefined){this.obj_loaded_row_kid[V].set_write_info(crsReport.organId,crsReport.userId,crsReport.writeTime,crsReport.s_title,crsReport.s_memo);if(this.obj_loaded_row_kid[V].s_val!=""){L+="update crscell.crs_tabledata"+this.rows[this.obj_loaded_row_kid[V].obj_col_schema.row_idx].id+" set "+this.obj_loaded_row_kid[V].s_val+" where kid='"+getColRealKId(V)+"';"}}else{this.obj_loaded_row_kid[V]=undefined;delete this.obj_loaded_row_kid[V]}}}if(this.obj_new_row_kid!=null){var M="kid, organid, userid, writetime, uploadtime, logiccheck, isfrozen, ismerge, rkid, displayseq, title, memo, ";for(V in this.obj_new_row_kid){var U=this.obj_new_row_kid[V];U.set_write_info(crsReport.organId,crsReport.userId,crsReport.writeTime,crsReport.s_title,crsReport.s_memo);if(U.arr_val_list!=null&&(U.i_display_seq==1&&crsReport.openMode=="write"||!U.is_blank())){L+="insert into crscell.crs_tabledata"+this.rows[U.obj_col_schema.row_idx].id+"("+M+U.arr_col_list.toString()+")values('"+getColRealKId(V)+"','"+crsReport.organId+"','"+crsReport.userId+"','"+crsReport.writeTime+"','0000-00-00 00:00:00', 'unchecked', 'n', 'n', '"+crsReport.refKID+"','"+U.i_display_seq+"','"+crsReport.s_title+"','"+crsReport.s_memo+"',"+U.get_delimited_text().replaceAll("'null'","null")+");";this.update_row_kid(V,U);this.obj_new_row_kid[V]=undefined;delete this.obj_new_row_kid[V]}}var V=-1;for(V in this.obj_new_row_kid){break}if(V==-1){this.obj_new_row_kid=null}}if(this.obj_deleted_row_kid!=null){this.obj_deleted_row_kid=null}}if(L!=""){if(ah){return L}crsReport.crsDataSet.execUpdate(L);if(!ah&&S!=null){for(var V=0,P=S.length/4;V<P;V++){crsReport.crsCommon.set_cell_pvalue(S[V*4],S[V*4+1],S[V*4+2],S[V*4+3])}}}if(!ah&&!aa){if(crsReport.b_submit){alert("\u63d0\u4ea4\u6210\u529f\uff01")}else{alert("\u4fdd\u5b58\u6210\u529f\uff01")}crsReport.b_saved=true}}if(ag!=""){alert(ag)}};TCRSTableIndex.prototype.can_append=function(i,j){var g={};g.b_can_append=false;if($(i).attr("cid")!=undefined){var h=this.getAColSchema($(i).attr("cid"));if(h==null){return g}if(crsReport.writeColList!=null){var k=false;if(!h.col.isEmpty()){var l=h.col.first();while(!h.col.EOF()){if(crsReport.writeColList.indexOf(l.kid)!=-1){k=true;break}l=h.col.next()}}if(!k){return g}}g.expandtype=this.rows[h.row_idx].expandtype;if(g.expandtype=="\u6309\u884c\u5411\u4e0b"||g.expandtype=="\u6309\u5217\u5411\u53f3"){g.b_can_append=true;h.col.get_noclear_and_defaultval_column_list(g)}g.def_rect=h.col.getColumnDefRect("");g.initcz=this.rows[h.row_idx].initcz;if(g.b_can_append&&j){this.rows[h.row_idx].initcz++}}return g};TCRSTableIndex.prototype.can_delete=function(j,l,n){var h={};h.b_can_delete=false;if($(j).attr("cid")!=undefined){var i=this.getAColSchema($(j).attr("cid"));if(i==null){return h}if(crsReport.writeColList!=null&&!n){var k=false;if(!i.col.isEmpty()){var m=i.col.first();while(!i.col.EOF()){if(crsReport.writeColList.indexOf(m.kid)!=-1){k=true;break}m=i.col.next()}}if(!k){return h}}h.expandtype=this.rows[i.row_idx].expandtype;if(h.expandtype=="\u6309\u884c\u5411\u4e0b"||h.expandtype=="\u6309\u5217\u5411\u53f3"){h.b_can_delete=true}h.def_rect=i.col.getColumnDefRect("");if(this.rows[i.row_idx].initcz<=1){h.b_all=true}else{if(h.b_can_delete&&l){this.rows[i.row_idx].initcz--}}}return h};TCRSTableIndex.prototype.auto_increment=function(c){if(c!=""){var d=this.getAColSchema(c);if(d!=null){if(this.rows[d.row_idx].tabletype=="\u660e\u7ec6\u8868"){d.col.auto_increment(this.rows[d.row_idx].sheetindex-1,this.rows[d.row_idx].expandtype)}}}};TCRSTableIndex.prototype.create_row_kid=function(f){var d=getGuidGenerator();var e=new TCRSRowProperty(this.getAColSchema(f).col,0,crsReport.organId,crsReport.userId,crsReport.writeTime,crsReport.s_title,crsReport.s_memo);if(this.obj_new_row_kid==null){this.obj_new_row_kid={}}this.obj_new_row_kid[getColPlatKId(d)]=e;return d};TCRSTableIndex.prototype.update_row_kid=function(d,c){d=getColPlatKId(d);if(this.obj_loaded_row_kid==null){this.obj_loaded_row_kid={}}this.obj_loaded_row_kid[d]=c};TCRSTableIndex.prototype.delete_row_kid=function(b){if(this.obj_deleted_row_kid==null){this.obj_deleted_row_kid={}}b=getColPlatKId(b);if(this.obj_new_row_kid==null||this.obj_new_row_kid[b]==undefined){this.obj_deleted_row_kid[b]=null}else{if(this.obj_new_row_kid!=null){if(this.obj_new_row_kid[b]!=undefined){this.obj_new_row_kid[b]=null;delete this.obj_new_row_kid[b]}this.obj_deleted_row_kid[b]=null}}};TCRSTableIndex.prototype.get_autocode_list=function(h){var e=null;if(this.colSchemas!=null){for(s_k in this.colSchemas){var g=this.colSchemas[s_k].col.rows[this.colSchemas[s_k].col_idx];if(g.datatype=="\u81ea\u52a8\u7f16\u53f7"&&g.ishidden!="\u662f"&&(crsReport.writeColList==null||crsReport.writeColList.indexOf(g.kid)!=-1)){if(g.codeid!=""){var f=crsReport.crsAutoCode.get_next_autocode(g.codeid,h);if(f!=""){if(e==null){e=[]}e.push(this.rows[this.colSchemas[s_k].row_idx].sheetindex-1);e.push(g.cellspan);e.push(f)}}}}return e}};TCRSTableIndex.prototype.get_ref_report=function(s,t){if(t==undefined){if(crsReport.b_as_form){t=crsReport.crsCommon.crsForm._get_row_seq($(s).parent("tr"))-1;s=crsReport.crsCommon.crsForm._get_cid_by_td(s)}else{var q=crsReport.crsCommon.crsTable.crsCellControler.get_cell_point(s);s=$(s).attr("cid")}}var v=this.getAColSchema(s);if(t==undefined){t=v.get_display_seq(q.x,q.y)-1}var o=null;if(v!=null){if(v.col.rows[v.col_idx].refrepid!=""&&v.col.rows[v.col_idx].refrepid!="0"){if(!crsReport.b_is_query){var A=crsReport.crsTableIndex.create_cur_table_data(false);var p=crsReport.crsDataSet.open_hyperlink(s,t+1,crsReport.s_postfix,A);if(p!=""){var w=window.open(window.parent.location.pathname+"?"+p,"awin"+v.col.rows[v.col_idx].refrepid,"menubar=0,toolbar=0,scrollbars=no,status=1,resizable=1,left=0,top=0,width="+screen.availWidth+",height="+screen.availHeight);if(window.external&&typeof window.external.OA_SMS!="undefined"){}else{w.moveTo(0,0);w.resizeTo(screen.availWidth,screen.availHeight);w.focus()}}return o}var A=crsReport.crsTableIndex.create_cur_table_data(false);var p=crsReport.crsDataSet.open_hyperlink(s,t+1,crsReport.s_postfix,A);if(p!=""&&p.indexOf("openmode=read")!=-1){var w=window.open(window.parent.location.pathname+"?"+p,"awin"+v.col.rows[v.col_idx].refrepid,"menubar=0,toolbar=0,scrollbars=no,status=1,resizable=1,left=0,top=0,width="+screen.availWidth+",height="+screen.availHeight);if(window.external&&typeof window.external.OA_SMS!="undefined"){}else{w.moveTo(0,0);w.resizeTo(screen.availWidth,screen.availHeight);w.focus()}return o}o={rep:HandleMemoStr(v.col.rows[v.col_idx].refrepid,false),para:""};if(v.col.rows[v.col_idx].refrepcond!=""){o.para=HandleMemoStr(v.col.rows[v.col_idx].refrepcond,false);var B=o.para.indexOf("\u672c\u62a5\u8868.");while(B!=-1){B=o.para.indexOf("{",B);var r=o.para.indexOf("}",B);var x=o.para.substring(B,r+1);v=this.getAColSchema(x);var u=rectNameToIndex(v.col.rows[v.col_idx].cellspan);var y=this.rows[v.row_idx];if(y.tabletype=="\u660e\u7ec6\u8868"&&t>0){u[0].y+=(u[1].y-u[0].y+1)*t}var z=crsReport.crsCommon.get_cell_value(0,u[0].x,u[0].y);if(v.datatype=="\u65e5\u671f\u578b"){if(z!=""){z=z.replace(".","-");if(v.displaystyle=="yyyy\u5e74"){z+="-00-00"}else{if(v.displaystyle=="yyyy\u5e74mm\u6708"||v.displaystyle=="yyyy.mm"){z+="-00"}}}}o.para=o.para.replaceAll("\u672c\u62a5\u8868."+x,z).replaceAll('"',"");B=o.para.indexOf("\u672c\u62a5\u8868.")}}}}return o};TCRSTableIndex.prototype.is_invalid=function(d,e){var f=false;return f};TCRSTableIndex.prototype.free=function(){var b="";return this.crsDataSet.free_me(b)};TCRSTableIndex.prototype.clear_data_item_id=function(){if(this.obj_loaded_row_kid!=null){for(s_key in this.obj_loaded_row_kid){this.obj_loaded_row_kid[s_key]=null}this.obj_loaded_row_kid=null}};TCRSTableIndex.prototype.get_auto_code=function(){var f="";if(!this.isEmpty()){var h=this.first();while(!this.EOF()){if(h.tabletype=="\u4e3b\u8868"){var g=this.getColumn(h.id);if(g!=null){if(!g.isEmpty()){var j=g.first();while(!g.EOF()){if(j.datatype=="\u81ea\u52a8\u7f16\u53f7"||j.iskey=="\u662f"||j.isonly=="\u662f"){var i=g.get_cell_value(j.id,1,true,h,true);if(i!=""&&f.indexOf(i)==-1){if(f!=""){f+="/"}f+=i}}j=g.next()}}}}h=this.next()}}return f};TCRSTableIndex.prototype.set_hidden_cell_value=function(i,f,j,h){if(h==undefined){h=false}var g=this.getAColSchema(i);if(this.arr_hidden_rows==null){this.arr_hidden_rows={}}if(this.arr_hidden_rows[g.tableid]==undefined){this.arr_hidden_rows[g.tableid]={}}i=getColPlatKId(i);if(this.arr_hidden_cols==null){this.arr_hidden_cols={}}if(this.arr_hidden_cols[i]==undefined){this.arr_hidden_cols[i]=[]}if(this.arr_hidden_cols[i][f]==undefined){this.arr_hidden_cols[i][f]={pval:"",val:""}}if(h){this.arr_hidden_cols[i][f]["pval"]=j}else{this.arr_hidden_cols[i][f]["val"]=j}if(this.arr_hidden_rows[g.tableid][i]==undefined){this.arr_hidden_rows[g.tableid][i]=null}};TCRSTableIndex.prototype.get_hidden_cell_value=function(c,d){c=getColPlatKId(c);if(this.arr_hidden_cols!=undefined&&this.arr_hidden_cols[c]!=undefined&&this.arr_hidden_cols[c][d]!=undefined){return this.arr_hidden_cols[c][d]["val"]}else{return""}};TCRSTableIndex.prototype.clear_hidden_cell_value=function(c,d){c=getColPlatKId(c);if(this.arr_hidden_cols!=undefined&&this.arr_hidden_cols[c]!=undefined&&this.arr_hidden_cols[c][d]!=undefined){this.arr_hidden_cols[c][d]["val"]=""}};TCRSTableIndex.prototype.delete_hidden_row=function(h,i){var g=this.getAColSchema(h);h=getColPlatKId(h);if(this.arr_hidden_cols!=undefined&&this.arr_hidden_cols[h]!=undefined&&this.arr_hidden_cols[h][i]!=undefined){for(var j=i,f=this.arr_hidden_cols[h].length;j<f-1;j++){this.arr_hidden_cols[h][j]=this.arr_hidden_cols[h][j+1]}if(i==0){this.arr_hidden_cols[h]=undefined;this.arr_hidden_rows[g.tableid][h]=undefined}else{this.arr_hidden_cols[h]=this.arr_hidden_cols[h].slice(0,i)}for(s_k in this.arr_hidden_rows[g.tableid]){if(s_k!=h){for(var j=i,f=this.arr_hidden_cols[s_k].length;j<f-1;j++){this.arr_hidden_cols[s_k][j]=this.arr_hidden_cols[s_k][j+1]}if(i==0){this.arr_hidden_cols[s_k]=undefined}else{this.arr_hidden_cols[s_k]=this.arr_hidden_cols[s_k].slice(0,i)}}}}};
