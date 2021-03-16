$(document).ready(function() {
  var kernelVersion = "4.0";
  var kernelNamespace = "kernelName";
  var kernelSchema = "http://kernelSchema";
  var kernelSchemaLocation = kernelNamespace + " " + kernelSchema;
  var header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + br() + "<gmd:MD_Metadata xmlns=\"" + kernelNamespace + "\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"" + kernelSchemaLocation + "\">" + br();
  $("select[title]").each(function(){
	 var tagName = name($(this));
	 ps($(this), optionValues[tagName]);
  });
  $("body").on("keyup", "input", function(event) {
    event.preventDefault();
    var xml = header;
    $("div.section").each(function(){
    	xml += process($(this));
    });
    xml += ct("gmd:MD_Metadata");
    metadata = xml;
    $("div.right code").text(xml);
    $(".right").show();
  });
  $("body").on("change", "select", function(event) {
    event.preventDefault();
    $("input").eq(0).keyup();
  });
  $("#reset").bind("click", function(event) {
    event.preventDefault();
    location.reload(true);
  });
  $("#selectall").bind("click", function(event) {
    event.preventDefault();
    st($("div code").get(0));
  });
  $("button.add.group").bind("click", function(event) {
    event.preventDefault();
    var d = $(this).parent().find(".tag-group:first").clone();
    $(d).find("input,select").val("");
    $(d).find("input + button.delete.element").each(function() {
      $(this).prev("input").remove();
      $(this).remove();
    });
    $("<button/>", {"class":"delete group", type:"button", text:"-"}).appendTo($(d).find(".tag:first"));
    d.appendTo($(this).parent());
  });

  $("div.section").on("mouseenter mouseleave focusin focusout", "button.delete.group, button.delete.single-tag", function(event){
	 event.preventDefault();
	 $(this).parent().toggleClass("remove-highlight");
  });
  $("div.section").on("click", "button.delete.group", function(event) {
    event.preventDefault();
    $(this).parent().remove();
    $("input").eq(0).keyup();
  });
  $("body").on("click", " button.add.single-tag", function(event) {
    event.preventDefault();
    var c = $(this).parent().clone();
    $(c).find("input,select").val("");
    $(this).before($("<button/>", {"class":"delete single-tag", type:"button", text:"-"}));
    c.insertAfter($(this).parent());
    $(this).remove();
  });
  $("body").on("click", "button.delete.single-tag", function(event) {
    event.preventDefault();
    $(this).parent().remove();
    $("input").eq(0).keyup();
  });
  $("body").on("click", "button#more", function(event) {
    event.preventDefault();
    var div = $(this).parent();
    $(div).find("button#more").hide();
    $(div).find("div#subgroup,button#less").show();
  });
  $("body").on("click", "button#less", function(event) {
    event.preventDefault();
    var div = $(this).parent();
    $(div).find("div#subgroup,button#less").hide();
    $(div).find("button#more").show();
    $(div).find("div#subgroup input,div#subgroup select").val("");
    $("input").eq(0).keyup();
  });
  $("body").on("click", "h3.recommended,h3.other,h2.cdg", function(event) {
    var div = $(this).next("div");
    var text = $(this).html();
    if (text.charAt(0) == "+") {
      text = text.replace("+", "-");
      $(this).html(text);
      $(div).show();
    } else {
      if (text.charAt(0) == "-") {
        text = text.replace("-", "+");
        $(this).html(text);
        $(div).hide();
      }
    }
  });
});

var optionValues = {};
optionValues["codeListValue#CI_DateTypeCode"] = ["creation", "publication", "revision"];
optionValues["codeListValue#CI_RoleCode"] = ["author", "custodian", "distributor", "originator", "owner", "pointOfContact", "principalInvestigator", "processor", "publisher", "resourceProvider", "user"];
optionValues["codeListValue#CI_OnLineFunctionCode"] = ["download", "information", "offlineAccess", "order", "search"];
optionValues["codeListValue#CI_PresentationFormCode"] = ["documentDigital", "documentHardcopy", "imageDigital", "imageHardcopy", "mapDigital", "mapHardcopy", "modelDigital", "modelHardcopy", "profileDigital", "profileHardcopy", "tableDigital", "tableHardcopy", "videoDigital", "videoHardcopy"];
optionValues["codeListValue#DQ_EvaluationMethodTypeCode"] = ["directExternal", "directInternal", "indirect"];
optionValues["codeListValue#DS_AssociationTypeCode"] = ["crossReference", "largerWorkCitation", "partOfSeamlessDatabase", "source", "stereoMate"];
optionValues["codeListValue#DS_InitiativeTypeCode"] = ["campaign", "collection", "exercise", "experiment", "investigation", "mission", "operation", "platform", "process", "program", "project", "sensor", "study", "task", "trial"];
optionValues["codeListValue#MD_CellGeometryCode"] = ["area", "point"];
optionValues["codeListValue#MD_CharacterSetCode"] = ["8859part1", "8859part10", "8859part11", "8859part13", "8859part14", "8859part15", "8859part16", "8859part2", "8859part3", "8859part4", "8859part5", "8859part6", "8859part7", "8859part8", "8859part9", "GB2312", "big5", "ebcdic", "eucJP", "eucKR", "jis", "shiftJIS", "ucs2", "ucs4", "usAscii", "utf16", "utf7", "utf8"];
optionValues["codeListValue#MD_ClassificationCode"] = ["confidential", "restricted", "secret", "topSecret", "unclassified"];
optionValues["codeListValue#MD_CoverageContentTypeCode"] = ["image", "physicalMeasurement", "thematicClassification"];
optionValues["codeListValue#MD_DatatypeCode"] = ["abstractClass", "aggregateClass", "association", "characterString", "class", "codelist", "codelistElement", "datatypeClass", "enumeration", "integer", "interfaceClass", "metaClass", "specifiedClass", "typeClass", "unionClass"];
optionValues["codeListValue#MD_DimensionNameTypeCode"] = ["column", "crossTrack", "line", "row", "sample", "time", "track", "vertical"];
optionValues["codeListValue#MD_GeometricObjectTypeCode"] = ["complex", "composite", "curve", "point", "solid", "surface"];
optionValues["codeListValue#MD_ImagingConditionCode"] = ["blurredImage", "cloud", "degradingObliquity", "fog", "heavySmokeOrDust", "night", "rain", "semiDarkness", "shadow", "snow", "terrainMasking"];
optionValues["codeListValue#MD_KeywordTypeCode"] = ["discipline", "place", "stratum", "temporal", "theme"];
optionValues["codeListValue#MD_MaintenanceFrequencyCode"] = ["annually", "asNeeded", "biannually", "continual", "daily", "fortnightly", "irregular", "monthly", "notPlanned", "quarterly", "unknown", "weekly"];
optionValues["codeListValue#MD_MediumFormatCode"] = ["cpio", "highSierra", "iso9660", "iso9660AppleHFS", "iso9660RockRidge", "tar"];
optionValues["codeListValue#MD_MediumNameCode"] = ["1quarterInchCartridgeTape", "3480Cartridge", "3490Cartridge", "3580Cartridge", "3halfInchFloppy", "4mmCartridgeTape", "5quarterInchFloppy", "7trackTape", "8mmCartridgeTape", "9trackType", "cdRom", "digitalLinearTape", "dvd", "dvdRom", "hardcopy", "onLine", "satellite", "telephoneLink"];
optionValues["codeListValue#MD_ObligationCode"] = ["conditional", "mandatory", "optional"];
optionValues["codeListValue#MD_PixelOrientationCode"] = ["center", "lowerLeft", "lowerRight", "upperLeft", "upperRight"];
optionValues["codeListValue#MD_ProgressCode"] = ["completed", "historicalArchive", "obsolete", "onGoing", "planned", "required", "underDevelopment"]];
optionValues["codeListValue#MD_RestrictionCode"] = ["copyright", "intellectualPropertyRights", "license", "otherRestrictions", "patent", "patentPending", "restricted", "trademark"];
optionValues["codeListValue#MD_ScopeCode"] = ["attribute", "attributeType", "collectionHardware", "collectionSession", "dataset", "dimensionGroup", "feature", "featureType", "fieldSession", "model", "nonGeographicDataset", "propertyType", "series", "service", "software", "tile"];
optionValues["codeListValue#MD_SpatialRepresentationTypeCode"] = ["grid", "stereoModel", "textTable", "tin", "vector", "video"];
optionValues["codeListValue#MD_TopicCategoryCode"] = ["biota", "boundaries", "climatologyMeteorologyAtmosphere", "economy", "elevation", "environment", "farming", "geoscientificInformation", "health", "imageryBaseMapsEarthCover", "inlandWaters", "intelligenceMilitary", "location", "oceans", "planningCadastre", "society", "structure", "transportation", "utilitiesCommunication"];
optionValues["codeListValue#MD_TopologyLevelCode"] = ["abstract", "fullPlanarGraph", "fullSurfaceGraph", "fullTopology3D", "geometryOnly", "planarGraph", "surfaceGraph", "topology1D", "topology3D"];
optionValues["codeListValue#MX_ScopeCode"] = ["attribute", "attributeType", "collectionHardware", "collectionSession", "dataset", "dimensionGroup", "feature", "featureType", "fieldSession", "initiative", "model", "nonGeographicDataset", "otherAggregate", "platformSeries", "productionSeries", "propertyType", "sensor", "sensorSeries", "series", "service", "software", "stereomate", "tile", "transferAggregate"];

function process(section){
	var isWrapper = $(section).hasClass("wrapper-tag");
	var indent = 0;
	var xml = "";

  if ($(section).hasClass("ignore"))
    return xml;

	if (isWrapper){
		indent = 1;
	}

  $(section).find(".tag-group:not([data-refid]):not(.ignore)>.tag").each(function(){
    xml += processTag(this,indent);
  });

	if (xml.length > 0){
		if (isWrapper){
			var wrapperName = name(section);
			xml = ot(wrapperName) + br() + xml + ct(wrapperName) + br();
		}
	}

	return xml;
}

function processTag(tag, indent){
	var xml = "";
  if ($(tag).hasClass('tag-ref')) {
    refto = $(tag).attr("data-refto");
    tag = $("[data-refid='" + refto + "']");
  };

	var attributes;
	var value;
	var tagName = name(tag);
	var attr = attribs(tag);
  var selfClosing = $(tag).hasClass("self-closing");

	var tagValues = $(tag).children(".tag-value");

  if ($(tagValues).length) {
    if ( $(this).is("select") ){
			value = selectValue(tagValues[0]);
		} else {
      value = inputValue(tagValues[0]);
    }
  }

  var shadowTag = $(tag).hasClass("shadow-tag");

	$(tag).children(".tag").each(function(){
		xml += processTag(this, indent + (shadowTag ? 0 : 1));
	});

  if (shadowTag) return xml;

  if (xml.length > 0){
		  xml = tab(indent) + ota(tagName,attr) + br() + xml + tab(indent) + ct(tagName) + br();
	}	else if (typeof value !== "undefined" && (value.length > 0 || ($(tag).hasClass("allow-empty") && attr.length > 0))){
	    if (!selfClosing) {
        xml = tab(indent) + ota(tagName,attr) + value + ct(tagName) + br();
      } else {
        xml = tab(indent) + scota(tagName,attr) + br();
      }
  }

	return xml;
}

function attribs(element){
	var attribs = "";

	$(element).children(".tag-attribute").each(function(){
		var value = "";
		var n = name(this).replace(/#.*/g, "");

		if ( $(this).is("select") ){
			value = selectValue(this);
		} else {
      value = inputValue(this);
    }

		if (value.length > 0){
			if (attribs.length > 0){
				attribs += " ";
			}
			attribs += n + "=\"" + value +"\"";
		}
	});

	return attribs;
}

function inputValue(input){
	return $(input).val().encodeXML();
}

function selectValue(select){
	return $(select).find("option").filter(":selected").val().encodeXML();
}

function name(tag){
	return $(tag).attr("title");
}

function ps(s, sarr) {
  addO(s, "", "" );
  for (var i = 0;i < sarr.length;i++) {
    addO(s, sarr[i], sarr[i]);
  }
}

function addO(s, v, d) {
  $(s).append($("<option>").val(v).html(d));
}

function br() {
  return "\n";
}

function tab(number){
	var tabs = "";
	if (typeof number !== "undefined"){
		for (var i = 1; i <= number; i++ ){
			tabs += "\t";
		}
	}
	else{
		tabs = "\t";
	}
	return tabs;
}

function scota(tag, attr) {
  if (attr.length > 0){
		return "<" + tag +" "+ attr + "/>";
	} else {
		return scot(tag);
	}
}

function scot(tag) {
		return "<" + tag + "/>";
}

function ota(tag,attr) {
	if (attr.length > 0){
		return "<" + tag +" "+ attr + ">";
	}
	else{
		return ot(tag);
	}
}

function ot(tag) {
  return "<" + tag + ">";
}

function ct(tag) {
  return "</" + tag + ">";
}

function st(element) {
  var doc = document, text = element, range, selection;
  if (doc.body.createTextRange) {
    range = doc.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else {
    if (window.getSelection) {
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

String.prototype.encodeXML = function() {
  return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
};

var metadata = "";
var MIME_TYPE = "application/xml";
var cleanUp = function(a) {
  setTimeout(function() {
    window.URL.revokeObjectURL(a.href);
  }, 1500);
  $("span#output").html("");
};

var downloadFile = function() {
  window.URL = window.webkitURL || window.URL;
  var prevLink = $("span#output a");
  if (prevLink) {
    $("span#output").html("");
  }
  var bb = new Blob([metadata], {type:MIME_TYPE});
  if (navigator.msSaveBlob) {
      navigator.msSaveBlob(bb, "metadata.xml");
  } else {
    var a = document.createElement("a");
    a.download = "metadata.xml";
    a.href = window.URL.createObjectURL(bb);
    a.onclick = function(e) {
      if ($(this).is(":disabled")) {
        return false;
      }
      cleanUp(this);
    };
    $(a).appendTo($("span#output"));
    $(a)[0].click();
  }
};

function save() {
  if (false) {
    alert("Not currently supported in Internet Explorer");
  } else {
    downloadFile();
  }
}
