package com.huatek.frame.core.page;
/***
 * 查询字段类型.
 * @author winner_pan
 *
 */
public enum QueryFieldEnum {
	stringType("string"), longType("long"), doubledType("double"), dateType(
			"date"), dateTimeType("dateTime"), dateMonthType("dateMonth");
	private final String value;

	private QueryFieldEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	public static String getValues(){
		return stringType.value+","+longType.value+","+
				doubledType.value+","+dateType.value+","+dateTimeType.value;
	}

}
