function TCRSReport(o,p,w,u,t,y,x,s,r,B,v,A,q,z){this.openMode=o;this.repId=p;this.s_repname="";this.organId=w;this.userId=u;this.writeTime=t;this.s_title="";this.s_memo="";this.s_writer_organid="";this.s_writer=y;if(this.s_writer==""||this.s_writer==this.userId){this.s_writer=this.userId;this.s_writer_organid=w}this.s_assign_user=x;if(this.s_assign_user==undefined){this.s_assign_user=""}this.refKID="";this.s_kid="";title_schema="";subtitle_schema="";this.s_title_schema="";this.s_subtitle_schema="";s_title_schema=new Object();s_title_schema.name="";s_subtitle_schema=new Object();this.mobile=B;this.mobilestyle=v;this.s_repno="";this.showZeroValue=false;this.writeColList=null;this.readColList=null;this.obj_target_cell=null;this.obj_mouse_enter_cell=null;this.obj_mouse_enter_row=null;this.s_last_cell_bg_color=null;this.obj_target_inline_obj=null;this.crsDataSet=new TCRSDataSet();this.crsTableIndex=new TCRSTableIndex(this.crsDataSet,this.repId);this.crsFormulasCache=new TCRSFormulasCache(this.crsDataSet,this.repId);this.crsCodeIndex=new TCRSCodeIndex(this.crsDataSet);this.crsAutoCode=new TCRSAutoCode(this.crsDataSet);this.crsPrivCache=null;this.crsDeptCache=new TCRSDepartment(this.crsDataSet,w);this.crsUserCache=new TCRSUser(this.crsDataSet);this.crsChartCache=new TCRSChart(this.crsDataSet,this.repId);this.crsWorkflow=new TCRSWorkflow(this.crsDataSet,this.repId);this.crsReportState=new TCRSReportState(this.crsDataSet,this.repId,this.userId,this.writeTime);this.b_as_form=A;this.crsCommon=new TCRSCommon(A);this.obj_cell_maps={};this.ListKey="";this.s_read_filter="";this.s_dataflow="";this.i_active_sheet_index=0;this.obj_active_cell=null;if(this.writeTime==""){this.writeTime=this.crsDataSet.get_now()}this.s_begin_task="";this.s_cur_task=r;this.b_is_endtask=false;this.s_write_mode="";this.s_write_role="";this.s_can_roll_back="";this.s_next_task="";this.s_only_redirect_task="";this.b_submit=false;this.s_begin_writer="";this.arr_prev_done_tasks=null;this.b_saved=false;this.s_para=unescape(s);this.i_width=0;this.i_height=0;this.arr_schema=null;this.s_data_flow="";this.func_show_list_view=null;this.arr_upload_files=[];this.b_is_query=false;this.b_from_center=false;this.b_inline=false;this.s_postfix=q;this.s_timer="";this.b_has_inline_calcu=false;this.b_crs_gz=false;this.b_has_sign_seal=false;this.DWebSignSeal=null;this.b_delete_fresh=z}TCRSReport.prototype={constructor:TCRSReport,get_valid_cur_task:function(){var b=crsReport.s_cur_task;if(b==""){b=crsReport.s_begin_task}else{b=crsReport.crsWorkflow.get_valid_task(b)}return b},doOpenReport:function(){var b=this.crsDataSet.execQuery("select * from crscell.crs_report where id='"+this.repId+"'",undefined,undefined,"#tablecrs_report");this.s_write_organ=HandleMemoStr(b[0].write_priv_organ,false);this.s_write_role=HandleMemoStr(b[0].write_priv_role,false);this.s_kid=b[0].kid;this.s_write_mode=b[0].mode;this.showZeroValue=b[0].showzerovalue=="y";this.b_has_inline_calcu=b[0].has_inline_calcu=="y";this.s_title_schema=HandleMemoStr(b[0].title_schema,false);this.s_subtitle_schema=HandleMemoStr(b[0].subtitle_schema,false);s_title_schema.name=HandleMemoStr(b[0].title_schema,false);s_subtitle_schema.name=HandleMemoStr(b[0].subtitle_schema,false);this.s_repno=b[0].repno;this.s_repname=b[0].repname;if(this.openMode!="delete"){this.crsChartCache.load_chart()}this.initPara();this.crsCommon.draw(this.openMode!="write");if(this.arr_schema["#fetch_res"]!=undefined){this.crsFormulasCache.loadData("#tablecrs_formulas");this.crsFormulasCache.init_formulas();if(this.b_crs_gz){this.arr_schema["#fetch_res"]=crs_decode(this.arr_schema["#fetch_res"])}this.fill_values(this.arr_schema["#fetch_res"],this,this.arr_schema["#fetch_idx"])}if(this.openMode=="copynew"){this.writeTime=this.crsDataSet.get_now();this.crsTableIndex.clear_data_item_id();this.openMode="write"}if(this.openMode!="delete"){this.set_timer()}},initPara:function(){this.s_begin_task=this.crsWorkflow.get_begin_task();if(this.openMode=="write"||this.openMode=="copynew"){this.crsPrivCache=new TCRSDetailPriv(this.crsDataSet,this.repId,false);if(this.has_workflow()){var c=this.crsWorkflow.get_task_candidate("");for(i in c){if(this.s_begin_writer!=""){this.s_begin_writer+=","}this.s_begin_writer+=i}}var d=this.crsUserCache.get_dept_and_priv(this.s_writer);if(this.s_writer_organid==""){this.s_writer_organid=d.dept}this.crsPrivCache.getColumnList(this.s_writer,d.dept,d.other_dept,d.priv,d.other_priv,this.s_assign_user)}else{if(this.openMode=="edit"){if(this.s_cur_task==""||this.s_cur_task==this.s_begin_task||this.s_cur_task.indexOf(this.s_begin_task+"(")!=-1){this.crsPrivCache=new TCRSDetailPriv(this.crsDataSet,this.repId,false);var d=this.crsUserCache.get_dept_and_priv(this.s_writer);this.crsPrivCache.getColumnList(this.s_writer,d.dept,d.other_dept,d.priv,d.other_priv,this.s_assign_user)}else{var d=this.crsUserCache.get_dept_and_priv(this.s_writer);this.crsWorkflow.getColumnList(this.s_writer,d.dept,d.other_dept,d.priv,d.other_priv,this.s_assign_user)}if(this.s_writer_organid==""){this.s_writer_organid=d.dept}}else{if(this.openMode=="read"){this.crsPrivCache=new TCRSDetailPriv(this.crsDataSet,this.repId,true);var d=this.crsUserCache.get_dept_and_priv(this.s_writer);this.crsPrivCache.getColumnList(this.s_writer,d.dept,d.other_dept,d.priv,d.other_priv,this.s_assign_user)}}}this.crsTableIndex.initColSchema()},blur_handler:function(){this.crsCommon.blur_handler()},calculate:function(){this.crsCommon.calculate()},save_as_excel:function(){this.blur_handler();this.crsCommon.save_as_excel()},execute_manu_formulas:function(b){this.crsFormulasCache.execute_formulas("",CRS_MANUL_EXEC,0,"",1,b,false,false,false)},check:function(){this.save_data(false)},fill_values:function(aJ,bn,aH){if(bn.openMode=="delete"){return}bn.crsFormulasCache.s_info="";if(aJ==""){bn.crsCommon.begin_update();bn.crsCommon.end_update();return""}bn.crsCommon.begin_update();var aL=aJ.split("@");var az={};var j=1,bh="",a5=null,bg=null,bj=-1;var aV=[];var a1=[];for(var aK=0,aT=aL.length;aK<aT;aK++){if(aL[aK]==""){continue}var a4=aL[aK].split(";");var aX=a4[0].indexOf("_");if(aX==-1){aX=a4[0].length}var bm=a4[0].substr(0,aX);a4=a4.slice(1);var bm=bm%bn.crsFormulasCache.rows.length;var a7=bn.crsFormulasCache.rows[bm].formulastype;bh="";bj=-1;if(a7=="\u9a8c\u8bc1\u516c\u5f0f"){if(bn.crsFormulasCache.arr_formulas[bm].arr_cur_column_ref!=null){for(var ba=0,a9=a4.length;ba<a9;ba++){var aD=a4[ba].indexOf("->displayseq");var aX=aD;while(a4[ba].charAt(aX)!=","){aX--}var aY=parseInt(a4[ba].substring(aX+1,aD));if(bn.crsFormulasCache.arr_formulas[bm].i_cur_seq>0&&bn.crsFormulasCache.arr_formulas[bm].i_cur_seq!=aY){continue}for(var aQ=0,bc=bn.crsFormulasCache.arr_formulas[bm].arr_cur_column_ref.length;aQ<bc;aQ++){var aR=bn.crsFormulasCache.arr_formulas[bm].arr_cur_table_ref[aQ];if(bn.crsFormulasCache.arr_formulas[bm].arr_cur_column_ref[aQ].charAt(0)!="{"){bn.crsFormulasCache.arr_formulas[bm].arr_cur_column_ref[aQ]=crsReport.crsTableIndex.get_col_kid_by_id(aR,bn.crsFormulasCache.arr_formulas[bm].arr_cur_column_ref[aQ])}var bp=crsReport.crsTableIndex.getAColSchema(bn.crsFormulasCache.arr_formulas[bm].arr_cur_column_ref[aQ]);var aE=bp.get_cell_point(aY);var bo=parseInt(crsReport.crsTableIndex.rows[bp.row_idx].sheetindex)-1;crsReport.crsCommon.set_cell_backgroud_color(bo,aE.x,aE.y,is_color_position(bn.crsFormulasCache.rows[bm].fill_table));if(aQ==0&&bn.crsFormulasCache.arr_formulas[bm].s_error_hint_content!=""){bn.crsFormulasCache.s_info+="\u3010"+bn.crsFormulasCache.arr_formulas[bm].s_label+"//"+HandleMemoStr(bn.crsFormulasCache.arr_formulas[bm].s_error_hint_content,false)+"\u3011 \u7b2c\u3010"+aY+"\u3011\u884c\u6216\u5217\u4e0d\u6ee1\u8db3\n"}}}}}else{if(a7=="\u56de\u5199\u516c\u5f0f"){}else{for(var aQ=0,aw=a4.length;aQ<aw;aQ++){if(a4[aQ]==""){continue}var a6=a4[aQ].split(",");for(var aS=0,be=a6.length;aS<be;aS++){aX=a6[aS].indexOf("->");if(aX==-1){continue}var bl=a6[aS].substr(0,aX);var aZ=a6[aS].substr(aX+2,a6[aS].length);aX=aZ.indexOf(CRSLimiter);if(aX==-1){var aF=bn.crsTableIndex.getAColSchema(aZ);var aR=bn.crsTableIndex.rows[aF.row_idx].label;var k=aF.col.rows[aF.col_idx].columnlabel}else{var aR=aZ.substr(0,aX),k=aZ.substr(aX+3)}if(bl==""&&a1.indexOf(k)!=-1){continue}if(a1.indexOf(k)==-1){a1.push(k)}var s;var aC=bm+aR+k;if(az[aC]==undefined){az[aC]={};s=bn.crsFormulasCache.get_fill_type(bm,aR,k);if(s==""){for(var ba=0,a8=aH.length;ba<a8;ba++){s=bn.crsFormulasCache.get_fill_type(aH[ba],aR,k);if(s!=""){break}}if(s==""){s="\u586b\u5165\u503c"}}az[aC].fill_type=s;var p=bn.crsTableIndex.get_col_kid_by_name(aR,k);az[aC].col_schema=bn.crsTableIndex.getAColSchema(p)}else{s=az[aC].fill_type}if(bh!=aR||a5==null){if(bh!=aR||a5==null){a5=bn.crsTableIndex.search("label",aR)}bh=aR;if(j!=1){j=1}if(a5.tabletype=="\u660e\u7ec6\u8868"){if(aQ==0&&bj==-1){if(bn.crsFormulasCache.arr_formulas[bm].i_cur_seq==0){bn.crsFormulasCache.arr_formulas[bm].i_cur_seq=1}var aB=aV.indexOf(aR);if(aB!=-1){if(bn.crsFormulasCache.arr_formulas[bm].b_do_match){j=bn.crsFormulasCache.arr_formulas[bm].i_cur_seq}else{j=aV[aB+1]}aV[aB+1]=j+aw;bj=0}else{j=bn.crsFormulasCache.arr_formulas[bm].i_cur_seq;aV.push(aR);aV.push(j+aw);bj=0}}if(aw+j-1>a5.initcz&&bn.crsFormulasCache.arr_formulas[bm].has_fill()){var aP=aw+j-1-a5.initcz;var at=bn.crsTableIndex.getColumn(a5.id);var a3=rectNameToIndex(at.getColumnDefRect());if(a5.expandtype=="\u6309\u884c\u5411\u4e0b"){if(crsReport.b_as_form){crsReport.crsCommon.crsForm.append_record(a5,az[aC].col_schema,aP)}else{var av=a3[1].y-a3[0].y+1;var bf=a3[0].y+(a5.initcz-1)*av;var bd=av*aP;bn.crsTableIndex.update_cell_refer(a5.sheetindex,a5.expandtype,a3,aP,true);bn.crsCommon.crsTable.crsCellControler.insert_row(bn.obj_cell_maps[a5.sheetindex-1]["row"+bf+"column"+a3[0].x],a5.sheetindex-1,bf,bd);bn.crsCommon.crsTable.crsCellControler.cache_td(a5.sheetindex-1);for(var ba=0;ba<bd;ba++){var aY=bf+(ba+1)*av;var aG="row"+aY+"column"+a3[0].x;$(bn.obj_cell_maps[a5.sheetindex-1][aG]).parent("#row"+aY).attr("rid",bn.crsTableIndex.create_row_kid(at.rows[0].kid))}a5.initcz=aw+j-1;bn.crsTableIndex.auto_increment(at.rows[0].kid)}}else{if(a5.expandtype=="\u6309\u5217\u5411\u53f3"){var av=a3[1].x-a3[0].x+1;var bf=a3[0].x+(a5.initcz-1)*av;var bd=av*aP;bn.crsTableIndex.update_cell_refer(a5.sheetindex,a5.expandtype,a3,aP,true);bn.crsCommon.crsTable.crsCellControler.insert_column(a5.sheetindex-1,bf,bd);bn.crsCommon.crsTable.crsCellControler.cache_td(a5.sheetindex-1);var br="";for(var ba=0;ba<bd;ba++){for(var aN=a3[0].y;aN<=a3[1].y;){var aY=bf+(ba+1)*av;var aG="row"+aN+"column"+aY;if(aN==a3[0].y){br=bn.crsTableIndex.create_row_kid(at.rows[0].kid)}var bb=$(bn.obj_cell_maps[a5.sheetindex-1][aG]);bb.attr("rid",br);if(bb.attr("rowspan")!=undefined){aN+=parseInt(bb.attr("rowspan"))}else{aN+=1}}}bn.crsTableIndex.auto_increment(at.rows[0].kid)}}}}}if(s=="\u6784\u9020\u4e0b\u62c9\u5217\u8868"||s=="\u6784\u9020\u4e0b\u62c9\u5217\u8868\uff08\u5141\u8bb8\u5176\u4ed6\u503c\uff09"){var bq=false;if(bn.crsFormulasCache.s_exec_time=="\u7b5b\u9009\u6761\u4ef6\u6539\u53d8\u540e\u81ea\u52a8\u6267\u884c"&&bn.crsFormulasCache.arr_formulas[bm].b_do_match){if(s=="\u6784\u9020\u4e0b\u62c9\u5217\u8868"){var au="n."+j+"."+aR+k+"."}else{var au="y."+j+"."+aR+k+"."}}else{if(s=="\u6784\u9020\u4e0b\u62c9\u5217\u8868"){var au="n.0."+aR+k+"."}else{var au="y.0."+aR+k+"."}bq=true}if(aQ==0){var ax=az[aC].col_schema.canwrite?"":" disabled";if(bl.indexOf(CRSLess+"col"+CRSGreaterSign)==-1){if(crsReport.crsTableIndex.rows[az[aC].col_schema.row_idx].tabletype=="\u4e3b\u8868"){var aU=$("td[cid='"+az[aC].col_schema.kid+"']");var bk=crsReport.crsCommon.get_cell_value(aU);if(bk!=""){$(aU).html('<select onchange="javascript:crsReport.crsCommon._do_editor_deactive(this);"'+ax+"><option value=''></option><option value='<\u8f93\u5165...>'><\u8f93\u5165...></option><option value='"+bk+"' selected>"+bk+"</option></select>")}else{$(aU).html('<select onchange="javascript:crsReport.crsCommon._do_editor_deactive(this);"'+ax+"><option value=''></option><option value='<\u8f93\u5165...>'><\u8f93\u5165...></option></select>")}}else{if(crsReport.b_as_form){var aM="aria-describedby$='"+az[aC].col_schema.kid+"'"}else{var aM="cid='"+az[aC].col_schema.kid+"'"}$("td["+aM+"]").each(function(){var a=crsReport.crsCommon.get_cell_value(this);if(a!=""){$(this).html('<select onchange="javascript:crsReport.crsCommon._do_editor_deactive(this);"'+ax+"><option value=''></option><option value='<\u8f93\u5165...>'><\u8f93\u5165...></option><option value='"+a+"' selected>"+a+"</option></select>")}else{$(this).html('<select onchange="javascript:crsReport.crsCommon._do_editor_deactive(this);"'+ax+"><option value=''></option><option value='<\u8f93\u5165...>'><\u8f93\u5165...></option></select>")}})}}else{if(bn.crsTableIndex.listValues[au]==undefined){bn.crsTableIndex.listValues[au]={};bn.crsTableIndex.listValues[au].formulas_label=bn.crsFormulasCache.rows[bm].label;bn.crsTableIndex.listValues[au].key=au;bn.crsTableIndex.listValues[au].data_list=[];bn.crsTableIndex.listValues[au].obj_view=null}else{bn.crsTableIndex.listValues[au].data_list=[];bn.crsTableIndex.listValues[au].obj_view=null}if(crsReport.crsTableIndex.rows[az[aC].col_schema.row_idx].tabletype=="\u4e3b\u8868"){var bi=$("td[cid='"+az[aC].col_schema.kid+"'] > input:eq(0)");if(!$(bi).hasClass("userField")){$(bi).addClass("userField");$(bi).parent().append("<a href=\"javascript:\" onclick=\"$(this).siblings().val('');$(this).parent().attr('val','');return false;\" class=\"ref-delete-handle inline-block\"></a>");if(ax==""){$(bi).click(function(){crsReport.crsCommon.obj_cur_editor=bi;crsReport.crsTableIndex.loadCodeItem(bi.parent())})}$(bi).width($(bi).parent().width()-32)}}else{if(crsReport.b_as_form){var aM="aria-describedby$='"+az[aC].col_schema.kid+"'"}else{var aM="cid='"+az[aC].col_schema.kid+"'"}$("td["+aM+"]").each(function(){var a=crsReport.crsCommon.get_cell_value(this);var b=$(this).children();if(!$(b).hasClass("userField")){$(b).addClass("userField").mouseenter(function(){crsReport.crsCommon._id(this)});$(this).append("<a href=\"javascript:\" onclick=\"$(this).siblings().val('');$(this).parent().attr('val','');return false;\" class=\"ref-delete-handle inline-block\"></a>");if(ax==""){var c=this;$(b).attr("onclick","crsReport.crsCommon.obj_cur_editor = $(this); crsReport.crsTableIndex.loadCodeItem($(this).parent());")}$(b).width($(b).parent().width()-32)}if(bq&&crsReport.b_as_form){bq=false;crsReport.crsCommon.crsForm.obj_detail_dump_row["tab_"+az[aC].col_schema.tableid][az[aC].col_schema.kid]=$(this).html()}})}}}if(bl!=""){var aW=bl.split(" ");for(var ba=0,a8=aW.length;ba<a8;ba++){var a2=HandleMemoStr(aW[ba],false);if(a2.indexOf("<col>")==-1){if(crsReport.crsTableIndex.rows[az[aC].col_schema.row_idx].tabletype=="\u4e3b\u8868"){crsReport.crsCommon.add_option($("td[cid='"+az[aC].col_schema.kid+"']").children("select"),a2)}else{if(crsReport.b_as_form){var aM="aria-describedby$='"+az[aC].col_schema.kid+"'"}else{var aM="cid='"+az[aC].col_schema.kid+"'"}$("td["+aM+"]").each(function(){crsReport.crsCommon.add_option($(this).children("select"),a2);if(bq&&crsReport.b_as_form&&ba==a8-1){bq=false;crsReport.crsCommon.crsForm.obj_detail_dump_row["tab_"+az[aC].col_schema.tableid][az[aC].col_schema.kid]=$(this).html()}})}}else{bn.crsTableIndex.listValues[au].data_list.push(a2)}}}}else{if(s=="\u586b\u5165\u503c"){var ay=az[aC].col_schema.display_rect[0].x,aA=az[aC].col_schema.display_rect[0].y;a5=bn.crsTableIndex.search("label",aR);if(bn.crsTableIndex.rows[az[aC].col_schema.row_idx].tabletype=="\u660e\u7ec6\u8868"){var aI;if(bn.crsTableIndex.rows[az[aC].col_schema.row_idx].expandtype=="\u6309\u5217\u5411\u53f3"||bn.crsTableIndex.rows[az[aC].col_schema.row_idx].expandtype=="\u4e0d\u6269\u5c55\uff08\u6309\u5217\u5411\u53f3\uff09"){aI=az[aC].col_schema.display_rect[1].x-az[aC].col_schema.display_rect[0].x+1;ay+=aI*(aQ+j-1)}else{aI=az[aC].col_schema.display_rect[1].y-az[aC].col_schema.display_rect[0].y+1;aA+=aI*(aQ+j-1)}}bl=HandleMemoStr(bl,false);if(!bn.b_as_form){var aU=bn.crsCommon.crsTable.crsCellControler.get_cell(a5.sheetindex-1,ay,aA);var a0=az[aC].col_schema;if(az[aC].col_schema.datatype=="\u65e5\u671f\u578b"){$(aU).addClass("td_date")}if(az[aC].col_schema.datatype=="\u8d27\u5e01\u578b"){$(aU).addClass("td_price")}if(az[aC].col_schema.datatype=="\u6570\u503c\u578b"){if(a0.col.rows[a0.col_idx].columnlabel.indexOf("\u91d1\u989d")>=0){$(aU).addClass("td_price")}else{$(aU).addClass("td_number")}}if(az[aC].col_schema.datatype=="\u94fe\u63a5\u578b"){$(aU).addClass("td_link")}if(a0.col.rows[a0.col_idx].columnlabel.indexOf("\u4eba")>=0){$(aU).addClass("td_name")}if(a0.col.rows[a0.col_idx].columnlabel.indexOf("\u540d\u79f0")>=0){$(aU).addClass("td_text")}if(a0.col.rows[a0.col_idx].columnlabel.indexOf("\u7f16\u53f7")>=0){$(aU).addClass("td_no")}if(a0.col.rows[a0.col_idx].columnlabel.indexOf("\u90e8\u95e8")>=0){$(aU).addClass("td_dept")}if(a0.col.rows[a0.col_idx].columnlabel.indexOf("\u671f\u6b21")>=0){$(aU).addClass("td_qici")}if(aQ%2==0){$(aU).parent().addClass("even")}}crsReport.crsCommon.set_cell_value(a5.sheetindex-1,ay,aA,bl,az[aC].col_schema);if(!bn.b_as_form){if(s_title_schema.name!=""){if(title_schema==""){title_schema=s_title_schema.name.replaceAll(az[aC].col_schema.kid,format_text(az[aC].col_schema.kid,bl))}else{title_schema=title_schema.replaceAll(az[aC].col_schema.kid,format_text(az[aC].col_schema.kid,bl))}}if(s_subtitle_schema.name!=""){if(subtitle_schema==""){subtitle_schema=s_subtitle_schema.name.replaceAll(az[aC].col_schema.kid,format_text(az[aC].col_schema.kid,bl))}else{subtitle_schema=subtitle_schema.replaceAll(az[aC].col_schema.kid,format_text(az[aC].col_schema.kid,bl))}}}}}}}}}}bn.crsCommon.end_update();if(!bn.b_as_form){var aO="";if(aO.indexOf(bn.s_repno)>=0){change_style=1}else{change_style=0}if(change_style==1){if(title_schema.indexOf("{")>=0){title_schema=title_schema.replace(/\{[^\}]*\}/g,"")}if(subtitle_schema.indexOf("{")>=0){subtitle_schema=subtitle_schema.replace(/\{[^\}]*\}/g,"0")}$("#table_title").html(title_schema);$("#table_title").css("display","block");$("#subject_title").html("("+subtitle_schema+")");$("#subject_title").css("display","block");$("#sheet0 #row0").remove();$("#sheet0 #row1").remove();$("#sheet0 #row2").addClass("title_th");var aT=$("#sheet0 #row2").children("td").length;for(aK=0;aK<aT;aK++){if($("#sheet0 #row2").children("td").eq(aK).html()==""){$("#sheet0  tr").each(function(){$(this).children("td:eq("+aK+")").remove()})}}$("#sheet0").addClass("tablenew");if(bn.mobile==1){$("#sheet0 #row2").addClass("mobiletitle_th");if(bn.mobilestyle==1){$("#table_title").addClass("ipmobile_table_title");$("#subject_title").addClass("ipmobile_subject_title");$("#sheet0 #row2").addClass("ipmobile_title_th");$("#sheet0  tr:not(:nth-child(1))").addClass("ipmobile_tr")}}$("#showdiv").css("display","block")}}},save_data:function(b){if(b==undefined){b=true}this.blur_handler();this.crsCommon.calculate(true);this.crsFormulasCache.execute_formulas(this.get_valid_cur_task(),CRS_SAVE_EXEC,"","","0","",false,false,false);this.crsTableIndex.save_data(b,false,true,false,false)},free:function(){if(this.s_timer!=""){clearTimeout(this.s_timer)}return this.crsTableIndex.free()},get_val_from_para:function(l){var g="";if(this.s_para!=""){var j=this.s_para.indexOf(l);if(j!=-1){var h=this.s_para.length,k=j+l.length;while(this.s_para.charAt(k)==" "){k++}if(k<h&&this.s_para.charAt(k)=="="){k++;while(this.s_para.charAt(k)==" "){k++}var m=k+1;while(m<h&&this.s_para.charAt(m)!=" "){m++}g=this.s_para.substring(k,m)}else{k=j;while(k>=0&&this.s_para.charAt(k)!=" "&&this.s_para.charAt(k)!="="){k--}while(k>=0&&this.s_para.charAt(k)==" "){k--}if(this.s_para.charAt(k)=="="){k--;while(k>=0&&this.s_para.charAt(k)==" "){k--}var m=k-1;while(m>=0&&this.s_para.charAt(m)!=" "){m--}g=this.s_para.substring(m+1,k+1)}}}}if(g!=""){if(g.charAt(0)=='"'){g=g.substr(1)}if(g.charAt(g.length-1)=='"'){g=g.substring(0,g.length-1)}}return g},get_sub_query:function(d,c){return""},get_column_data_type:function(f,d,e){return""},has_inline_func:function(){return this.b_has_inline_calcu},has_manu_exec_func:function(){return this.crsFormulasCache.has_manu_exec_func()},has_workflow:function(){return this.s_write_mode!=""||this.crsWorkflow.length()>0},has_chart:function(){return this.crsChartCache.length()>0},get_chart_type:function(){if(this.crsChartCache.length()>0){return this.crsChartCache.rows[0].chart_type}return"\u67f1\u72b6\u56fe"},pivot:function(k){var h=$(this.obj_active_cell).attr("cid");if(h==""){return}var f=this.crsCellControler.get_cell_point(this.obj_active_cell);var g=this.crsTableIndex.getAColSchema(h);var j=g.get_display_seq(f.x,f.y);this.crsFormulasCache.execute_formulas("","NaN",1,h,j,k,false,false,true)},resize:function(){this.crsCommon.resize()},submit_picture:function(d,c){if(d==undefined){d="FILE1"}ajaxFileUpload(d,"img",this.show_picture,c)},show_picture:function(k,l){if(k!=""){if(l==undefined){l=crsReport.obj_target_cell}crsReport.arr_upload_files.push(k);var g=$(l).width()-20,j=$(l).height()-2;var f=$(l).children("i").length>0?"<i align='right'>"+$(l).children("i").html()+"</i>":"";var h="<img src='/attachment/reportshop/images/"+k+"' width='"+g+"' height='"+j+"' ondblclick='window.parent.float_image(this)' onmouseover='crsReport.show_delete(this)'/>";$(l).html(h+f);$(l).attr("val2",k)}},show_delete:function(h){if($(h).next(":not(i)").length>0){return}if(this.openMode=="read"){return}var g=$(h).parent().attr("cid");if(g==undefined&&this.b_as_form){g=this.crsCommon.crsForm._get_cid_by_td($(h).parent())}if(g==""){return}var e=this.crsTableIndex.getAColSchema(g);if(e==null||!e.canwrite||!e.canread||(this.writeColList!=null&&this.writeColList.indexOf(g)==-1)){return}var f='<img id="delete_icon" title="\u5220\u9664" src="/static/images/closesearch.gif" align=absmiddle style="cursor:pointer;" onclick="crsReport.delete_attach(this)" onmouseout="crsReport.hide_delete(this);"/>';$(h).after(f)},hide_delete:function(b){$(b).remove()},delete_attach:function(j){j=$(j).prev();var h=$(j)[0].localName.toLowerCase();if(h=="img"){var f=$(j).attr("src");f=f.replaceAll("/attachment/reportshop/images/","");if(this.arr_upload_files.indexOf(f)==-1){this.arr_upload_files.push(f)}g=$(j).parent();$(j).parent().removeAttr("val2");$(j).next().remove();$(j).remove();f=this.crsCommon.get_rid_and_cid(g);$(g).prepend('<a class="addfile" href="javascript:;">\u9009\u62e9\u56fe\u7247<input class="addfile" hidefocus="true" type="file" size="1" id="'+f+'" name="'+f+'" accept="image/*" onchange="crsReport.submit_picture(\''+f+'\', $(this).parent().parent());" onclick="crsReport.crsCommon._id(this);"></a>')}else{if(h=="a"){var f=$(j).attr("href");f=f.replaceAll("/attachment/reportshop/attachment/","");if(this.arr_upload_files.indexOf(f)==-1){this.arr_upload_files.push(f)}var g=$(j).parent();$(j).parent().removeAttr("val2");$(j).next().remove();$(j).remove();f=f.substring(1,f.indexOf("}_"));var e=$.md5(f);$(g).prepend('<a class="addfile" href="javascript:;">\u9009\u62e9\u9644\u4ef6<input class="addfile" hidefocus="true" type="file" size="1" id="'+e+'" name="'+e+'" onchange="crsReport.submit_attach(\''+e+"', $(this).parent().parent(), '"+f+'\');" onclick="crsReport.crsCommon._id(this);"></a>')}}},submit_attach:function(d,c,e){if(e==undefined){e=""}if(d==undefined){d="FILE1"}ajaxFileUpload(d,"attach",this.show_attach,c,e)},show_attach:function(j,f){if(j!=""){if(f==undefined){f=crsReport.obj_target_cell}var g=j.split("}_");crsReport.arr_upload_files.push(j);var e=$(f).children("i").length>0?"<i align='right'>"+$(f).children("i").html()+"</i>":"";var h="<a href='/attachment/reportshop/attachment/"+j+"' target='_blank' onmouseover='crsReport.show_delete(this)'>"+g[1]+"</a>";$(f).html(h+e);$(f).attr("val2",g[1])}},hide_edit:function(b){$(b).remove()},edit:function(f){var d=$(f).parent().attr("val");var e='<input title="'+d+'" class="InputField Width90 "" onfocus="$(this).addClass(\'InputFocus\');" type="text" maxlength="100"value="'+d+'" onblur="$(this).removeClass(\'InputFocus\');crsReport.crsCommon._do_editor_deactive(this);">';$(f).parent().html(e)},show_edit:function(h){if($(h).next().length>0){return}if(this.openMode=="read"){return}var g=$(h).parent().attr("cid");if(g==undefined&&this.b_as_form){g=this.crsCommon.crsForm._get_cid_by_td($(h).parent())}if(g==""){return}var e=this.crsTableIndex.getAColSchema(g);if(e==null||!e.canwrite||!e.canread||(this.writeColList!=null&&this.writeColList.indexOf(g)==-1)){return}var f='<img title="\u7f16\u8f91" src="/static/images/edit.gif" align=absmiddle style="cursor:pointer;" onclick="crsReport.edit(this)" onmouseout="crsReport.hide_edit(this);"/>';$(h).after(f)},fill_selected_value:function(o,m,q,j){var n=this.crsCommon.get_row_seq(this.crsCommon.obj_cur_editor.parent())+j;var l=this.crsTableIndex.get_col_kid_by_id(o,m);var k=this.crsTableIndex.getAColSchema(l);var p=k.get_cell_point(n);this.crsCommon.set_cell_value(0,p.x,p.y,q)},on_dblclick:function(d){var f=(d.srcElement==undefined)?d.target:d.srcElement;if($(f).attr("cid")==undefined){f=$(f).parent("td");if(!this.b_as_form&&$(f).attr("cid")==undefined){return}}var e=crsReport.crsTableIndex.get_ref_report(f);if(e!=null){window.parent.link_report(e)}return false},_s_exec:function(){this.crsFormulasCache.execute_formulas("",CRS_WRITE_EXEC,"1","","0","",false,false,false)},set_timer:function(){if(this.has_chart()){var b=this.crsChartCache.first();if(b.realtime>0){this._s_exec();this.s_timer=window.setTimeout("crsReport.set_timer()",b.realtime*1000)}}}};
