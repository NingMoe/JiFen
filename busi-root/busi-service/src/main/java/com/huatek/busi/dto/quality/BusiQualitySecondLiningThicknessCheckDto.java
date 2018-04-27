package com.huatek.busi.dto.quality;

public class BusiQualitySecondLiningThicknessCheckDto {
	private Long id;

	private Long orgId;// 标段id(机构ID，根据机构ID查询名称)

	/** 后台对象接收id */

	private String orgName;// 标段名称

	private Long tendersBranchId;// 分部分项(分部分项表ID)

	/** @Fields tendersBranchName : 分部分项名称(父级拼接)*/
	private String tendersBranchName;
	
	private String tunnelName;// 隧道名称

	private String startCheckDate;// 开始检测时间

	private String endCheckDate;// 结束检测时间

	private String beginToEndStakeNo;// 起讫桩号

	private String liningType;// 衬砌类型

	private String designThickness;// 设计厚度(cm)

	private String actualMeasureAverageThickness;// 实测平均厚度(cm)

	private String oneLineQualifiedRate;// 单线合格率

	private String threeLineQualifiedRate;// 3线合格率

	private String fiveLineQualifiedRate;// 5线合格率

	private Long checkUserId;// 检测人员ID

	private String checkUserName;// 检测人员名称

	private String qualifiedStatus;// 合格状态(字典表)

	private String attachmentFile;// 附件

	private String isEdited;// 是否编辑过(Y、N)

	private Long creater;// 创建人id

	private String createrName;// 创建人姓名

	private String createTime;// 创建时间

	private Long modifer;// 修改人id

	private String modifierName;// 修改人姓名

	private String modifyTime;// 修改时间

	private Long tenantId;// 租户id

	private Integer isDelete;// 是否删除 0 未删除的正常数据 1 已删除的数据

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public Long getTendersBranchId() {
		return tendersBranchId;
	}

	public void setTendersBranchId(Long tendersBranchId) {
		this.tendersBranchId = tendersBranchId;
	}

	public String getTunnelName() {
		return tunnelName;
	}

	public void setTunnelName(String tunnelName) {
		this.tunnelName = tunnelName;
	}

	public String getStartCheckDate() {
		return startCheckDate;
	}

	public void setStartCheckDate(String startCheckDate) {
		this.startCheckDate = startCheckDate;
	}

	public String getEndCheckDate() {
		return endCheckDate;
	}

	public void setEndCheckDate(String endCheckDate) {
		this.endCheckDate = endCheckDate;
	}

	public String getBeginToEndStakeNo() {
		return beginToEndStakeNo;
	}

	public void setBeginToEndStakeNo(String beginToEndStakeNo) {
		this.beginToEndStakeNo = beginToEndStakeNo;
	}

	public String getLiningType() {
		return liningType;
	}

	public void setLiningType(String liningType) {
		this.liningType = liningType;
	}

	public Long getCheckUserId() {
		return checkUserId;
	}

	public void setCheckUserId(Long checkUserId) {
		this.checkUserId = checkUserId;
	}

	public String getCheckUserName() {
		return checkUserName;
	}

	public void setCheckUserName(String checkUserName) {
		this.checkUserName = checkUserName;
	}

	public String getQualifiedStatus() {
		return qualifiedStatus;
	}

	public void setQualifiedStatus(String qualifiedStatus) {
		this.qualifiedStatus = qualifiedStatus;
	}

	public String getAttachmentFile() {
		return attachmentFile;
	}

	public void setAttachmentFile(String attachmentFile) {
		this.attachmentFile = attachmentFile;
	}

	public String getIsEdited() {
		return isEdited;
	}

	public void setIsEdited(String isEdited) {
		this.isEdited = isEdited;
	}

	public Long getCreater() {
		return creater;
	}

	public void setCreater(Long creater) {
		this.creater = creater;
	}

	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public Long getModifer() {
		return modifer;
	}

	public void setModifer(Long modifer) {
		this.modifer = modifer;
	}

	public String getModifierName() {
		return modifierName;
	}

	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}

	public String getDesignThickness() {
		return designThickness;
	}

	public void setDesignThickness(String designThickness) {
		this.designThickness = designThickness;
	}

	public String getActualMeasureAverageThickness() {
		return actualMeasureAverageThickness;
	}

	public void setActualMeasureAverageThickness(
			String actualMeasureAverageThickness) {
		this.actualMeasureAverageThickness = actualMeasureAverageThickness;
	}

	public String getOneLineQualifiedRate() {
		return oneLineQualifiedRate;
	}

	public void setOneLineQualifiedRate(String oneLineQualifiedRate) {
		this.oneLineQualifiedRate = oneLineQualifiedRate;
	}

	public String getThreeLineQualifiedRate() {
		return threeLineQualifiedRate;
	}

	public void setThreeLineQualifiedRate(String threeLineQualifiedRate) {
		this.threeLineQualifiedRate = threeLineQualifiedRate;
	}

	public String getFiveLineQualifiedRate() {
		return fiveLineQualifiedRate;
	}

	public void setFiveLineQualifiedRate(String fiveLineQualifiedRate) {
		this.fiveLineQualifiedRate = fiveLineQualifiedRate;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}

	public Long getTenantId() {
		return tenantId;
	}

	public void setTenantId(Long tenantId) {
		this.tenantId = tenantId;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public String getTendersBranchName() {
		return tendersBranchName;
	}

	public void setTendersBranchName(String tendersBranchName) {
		this.tendersBranchName = tendersBranchName;
	}
	
}
