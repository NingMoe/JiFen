package com.huatek.busi.model.quality;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import com.huatek.busi.model.BusiFwOrg;
import com.huatek.frame.core.model.BaseEntity;

/**
 * 代码自动生成model类.
 * 
 * @ClassName: BusiQualityPrimarySupportConcreteThicknessCheckModifyLog
 * @Description:
 * @author: jordan_li
 * @Email :
 * @date: 2017-11-30 18:36:39
 * @version: Windows 7
 */

@Entity
@Table(name = "busi_quality_primary_support_concrete_thickness_check_modify_log")
public class BusiQualityPrimarySupportConcreteThicknessCheckModifyLog extends
		BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@GenericGenerator(name = "persistenceGenerator", strategy = "increment")
	@Column(name = "SUPPORT_CONCRETE_THICKNESS_CHECK_MODIFY_LOG_ID", nullable = true)
	private Long id;

	/** @Fields supportConcreteThicknessCheckId : 初期支护混凝土厚度检测 */
	@ManyToOne(cascade = { CascadeType.REFRESH, CascadeType.MERGE }, optional = true)
	@JoinColumn(name = "SUPPORT_CONCRETE_THICKNESS_CHECK_ID")
	private BusiQualityPrimarySupportConcreteThicknessCheck busiQualityPrimarySupportConcreteThicknessCheck;

	/** @Fields org : 标段名称 */
	@ManyToOne(cascade = { CascadeType.REFRESH, CascadeType.MERGE }, optional = true)
	@JoinColumn(name = "ORG_ID")
	private BusiFwOrg org;

	/** @Fields tendersBranchId : 分部分项(分部分项表ID) */
	@Column(name = "TENDERS_BRANCH_ID", nullable = false)
	private Long tendersBranchId;

	/** @Fields tunnelName : 隧道名称 */
	@Column(name = "TUNNEL_NAME", nullable = false, length = 100)
	private String tunnelName;

	/** @Fields startCheckDate : 开始检测时间 */
	@Column(name = "START_CHECK_DATE", nullable = false)
	private Date startCheckDate;

	/** @Fields endCheckDate : 结束检测时间 */
	@Column(name = "END_CHECK_DATE", nullable = false)
	private Date endCheckDate;

	/** @Fields beginToEndStakeNo : 起讫桩号 */
	@Column(name = "BEGIN_TO_END_STAKE_NO", nullable = false, length = 100)
	private String beginToEndStakeNo;

	/** @Fields checkUserId : 检测人员ID */
	@Column(name = "CHECK_USER_ID", nullable = false)
	private Long checkUserId;

	/** @Fields checkUserName : 检测人员名称 */
	@Column(name = "CHECK_USER_NAME", nullable = false, length = 100)
	private String checkUserName;

	/** @Fields liningType : 衬砌类型(字典表) */
	@Column(name = "LINING_TYPE", nullable = false, length = 30)
	private String liningType;

	/** @Fields intervalLength : 区间长度(m) */
	@Column(name = "INTERVAL_LENGTH", nullable = false, precision = 18, scale = 2)
	private BigDecimal intervalLength;

	/** @Fields designIntervalLength : 设计值(cm) */
	@Column(name = "DESIGN_INTERVAL_LENGTH", nullable = false, precision = 18, scale = 2)
	private BigDecimal designIntervalLength;

	/** @Fields actualMeasureAverageSpacing : 实测平均值(cm) */
	@Column(name = "ACTUAL_MEASURE_AVERAGE_SPACING", nullable = false, precision = 18, scale = 2)
	private BigDecimal actualMeasureAverageSpacing;

	/** @Fields actualMeasureMinLength : 实测最小值 */
	@Column(name = "ACTUAL_MEASURE_MIN_LENGTH", nullable = false, precision = 18, scale = 2)
	private BigDecimal actualMeasureMinLength;

	/** @Fields standardDeviation : 标准差 */
	@Column(name = "STANDARD_DEVIATION", nullable = false, precision = 18, scale = 2)
	private BigDecimal standardDeviation;

	/** @Fields qualifiedStatus : 合格状态(字典表) */
	@Column(name = "QUALIFIED_STATUS", nullable = false, length = 30)
	private String qualifiedStatus;

	/** @Fields attachmentFile : 附件 */
	@Column(name = "ATTACHMENT_FILE", nullable = false, length = 100)
	private String attachmentFile;

	/** @Fields creater : 创建人id */
	@Column(name = "CREATER", nullable = false)
	private Long creater;

	/** @Fields createrName : 创建人姓名 */
	@Column(name = "CREATER_NAME", nullable = false, length = 100)
	private String createrName;

	/** @Fields createTime : 创建时间 */
	@Column(name = "CREATE_TIME", nullable = false)
	private Date createTime;

	/** @Fields modifer : 修改人id */
	@Column(name = "MODIFER", nullable = false)
	private Long modifer;

	/** @Fields modifierName : 修改人姓名 */
	@Column(name = "MODIFIER_NAME", nullable = false, length = 100)
	private String modifierName;

	/** @Fields modifyTime : 修改时间 */
	@Column(name = "MODIFY_TIME", nullable = false)
	private Date modifyTime;

	/** @Fields tenantId : 租户id */
	@Column(name = "TENANT_ID", nullable = false)
	private Long tenantId;

	/** @Fields remark : 备注 */
	@Column(name = "REMARK", nullable = false, length = 255)
	private String remark;

	/** @Fields testPoints : 检测点数 */
	@Column(name = "TEST_POINTS", nullable = false)
	private Long testPoints;

	/** @Fields qualifiedPoints : 合格点数 */
	@Column(name = "QUALIFIED_POINTS", nullable = false)
	private Long qualifiedPoints;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public BusiQualityPrimarySupportConcreteThicknessCheck getBusiQualityPrimarySupportConcreteThicknessCheck() {
		return busiQualityPrimarySupportConcreteThicknessCheck;
	}

	public void setBusiQualityPrimarySupportConcreteThicknessCheck(
			BusiQualityPrimarySupportConcreteThicknessCheck busiQualityPrimarySupportConcreteThicknessCheck) {
		this.busiQualityPrimarySupportConcreteThicknessCheck = busiQualityPrimarySupportConcreteThicknessCheck;
	}

	public BusiFwOrg getOrg() {
		return org;
	}

	public void setOrg(BusiFwOrg org) {
		this.org = org;
	}

	public void setTendersBranchId(Long tendersBranchId) {
		this.tendersBranchId = tendersBranchId;
	}

	public Long getTendersBranchId() {
		return this.tendersBranchId;
	}

	public void setTunnelName(String tunnelName) {
		this.tunnelName = tunnelName;
	}

	public String getTunnelName() {
		return this.tunnelName;
	}

	public void setStartCheckDate(Date startCheckDate) {
		this.startCheckDate = startCheckDate;
	}

	public Date getStartCheckDate() {
		return this.startCheckDate;
	}

	public void setEndCheckDate(Date endCheckDate) {
		this.endCheckDate = endCheckDate;
	}

	public Date getEndCheckDate() {
		return this.endCheckDate;
	}

	public void setBeginToEndStakeNo(String beginToEndStakeNo) {
		this.beginToEndStakeNo = beginToEndStakeNo;
	}

	public String getBeginToEndStakeNo() {
		return this.beginToEndStakeNo;
	}

	public void setCheckUserId(Long checkUserId) {
		this.checkUserId = checkUserId;
	}

	public Long getCheckUserId() {
		return this.checkUserId;
	}

	public void setCheckUserName(String checkUserName) {
		this.checkUserName = checkUserName;
	}

	public String getCheckUserName() {
		return this.checkUserName;
	}

	public void setLiningType(String liningType) {
		this.liningType = liningType;
	}

	public String getLiningType() {
		return this.liningType;
	}

	public void setIntervalLength(BigDecimal intervalLength) {
		this.intervalLength = intervalLength;
	}

	public BigDecimal getIntervalLength() {
		return this.intervalLength;
	}

	public void setDesignIntervalLength(BigDecimal designIntervalLength) {
		this.designIntervalLength = designIntervalLength;
	}

	public BigDecimal getDesignIntervalLength() {
		return this.designIntervalLength;
	}

	public void setActualMeasureAverageSpacing(
			BigDecimal actualMeasureAverageSpacing) {
		this.actualMeasureAverageSpacing = actualMeasureAverageSpacing;
	}

	public BigDecimal getActualMeasureAverageSpacing() {
		return this.actualMeasureAverageSpacing;
	}

	public void setActualMeasureMinLength(BigDecimal actualMeasureMinLength) {
		this.actualMeasureMinLength = actualMeasureMinLength;
	}

	public BigDecimal getActualMeasureMinLength() {
		return this.actualMeasureMinLength;
	}

	public void setStandardDeviation(BigDecimal standardDeviation) {
		this.standardDeviation = standardDeviation;
	}

	public BigDecimal getStandardDeviation() {
		return this.standardDeviation;
	}

	public void setQualifiedStatus(String qualifiedStatus) {
		this.qualifiedStatus = qualifiedStatus;
	}

	public String getQualifiedStatus() {
		return this.qualifiedStatus;
	}

	public void setAttachmentFile(String attachmentFile) {
		this.attachmentFile = attachmentFile;
	}

	public String getAttachmentFile() {
		return this.attachmentFile;
	}

	public void setCreater(Long creater) {
		this.creater = creater;
	}

	public Long getCreater() {
		return this.creater;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getCreaterName() {
		return this.createrName;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setModifer(Long modifer) {
		this.modifer = modifer;
	}

	public Long getModifer() {
		return this.modifer;
	}

	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}

	public String getModifierName() {
		return this.modifierName;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public Date getModifyTime() {
		return this.modifyTime;
	}

	public void setTenantId(Long tenantId) {
		this.tenantId = tenantId;
	}

	public Long getTenantId() {
		return this.tenantId;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setTestPoints(Long testPoints) {
		this.testPoints = testPoints;
	}

	public Long getTestPoints() {
		return this.testPoints;
	}

	public void setQualifiedPoints(Long qualifiedPoints) {
		this.qualifiedPoints = qualifiedPoints;
	}

	public Long getQualifiedPoints() {
		return this.qualifiedPoints;
	}

}
