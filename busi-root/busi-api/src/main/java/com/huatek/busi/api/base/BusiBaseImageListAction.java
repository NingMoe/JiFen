package com.huatek.busi.api.base;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.huatek.busi.BusiUrlConstants;
import com.huatek.busi.dto.TreeGridAddIdAndUUIDDto;
import com.huatek.busi.dto.base.BusiBaseImageListDto;
import com.huatek.busi.service.base.BusiBaseImageListService;
import com.huatek.frame.authority.service.OperationService;
import com.huatek.frame.core.ResponseMessage;
import com.huatek.frame.core.page.QueryPage;

/**
 * 形象清单
 * @author eli_cui
 *
 */
@RestController
@RequestMapping(value = BusiUrlConstants.BUSI_BASE_IMAGE_LIST)
public class BusiBaseImageListAction {

    private static final Logger log = LoggerFactory.getLogger(BusiBaseImageListAction.class);

    @Autowired
    private BusiBaseImageListService busiBaseImageListService;
    
    @Autowired
    private OperationService oprationService;//日志记录服务类
    // oprationService.logOperation("保存工程量清单修改");
    
    /**
     * 获取顶级节点
     * @param queryPage
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryTopLevel", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<BusiBaseImageListDto>> _getTopeLevel(@RequestBody QueryPage queryPage) throws Exception {
        return new ResponseEntity<>(busiBaseImageListService.getTopLevelData(queryPage), HttpStatus.OK);
    }
    
    /**
     * 新增 修改 删除action
     * @param orgId
     * @param dtoList
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/saveData/{orgId}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<TreeGridAddIdAndUUIDDto>> saveData(@PathVariable("orgId") Long orgId, @RequestBody List<BusiBaseImageListDto> dtoList) throws Exception {
        return new ResponseEntity<>(busiBaseImageListService.dataManipulation(orgId, dtoList), HttpStatus.CREATED);
    }
    
    /**
     * 获取子节点action
     * @param parentUUID
     * @return
     */
    @RequestMapping(value = "/queryChildNodes/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<BusiBaseImageListDto>> _getChildqNodesByParentUUID(@PathVariable("id") Long id, @RequestBody QueryPage queryPage){
    	return new ResponseEntity<>(busiBaseImageListService.getChildqNodesByParentPK(id, queryPage), HttpStatus.CREATED);
    }
    
}
