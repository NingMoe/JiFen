package com.huatek.busi.api.quality;
import java.io.IOException;
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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.huatek.busi.BusiUrlConstants;
import com.huatek.busi.dto.quality.BusiQualityQuickProcessingDto;
import com.huatek.busi.service.quality.BusiQualityQuickProcessService;
import com.huatek.frame.core.ResponseMessage;
import com.huatek.frame.core.exception.BusinessCheckException;
import com.huatek.frame.core.page.DataPage;
import com.huatek.frame.core.page.QueryPage;
/**
 * 快捷处理
 * @author rocky_wei
 *
 */
@RestController
@RequestMapping(value = BusiUrlConstants.BUSIQUALITYQUICKPROCESS_API)
public class BusiQualityQuickProcessAction {

    private static final Logger log = LoggerFactory
            .getLogger(BusiQualityQuickProcessAction.class);

    @Autowired
    private BusiQualityQuickProcessService busiQualityQuickProcessService;
    
    /** 
    * @Title: getAllBusiQualityRectification 
    * @Description:  翻页查询BusiQualityRectification信息.
    * @param   queryPage
    * @return  ResponseEntity<DataPage<BusiQualityRectificationDto>>    
    * @throws  JsonParseException
    * @throws  JsonMappingException
    * @throws  IOException 
    */
    @RequestMapping(value = "/query")
    @ResponseBody
    public ResponseEntity<DataPage<?>> getAllBusiQualityRectification(@RequestBody QueryPage queryPage) throws JsonParseException, JsonMappingException, IOException { 	
	   log.debug("get all busiQualityRectification of param " + queryPage.getQueryInfo());
       DataPage<BusiQualityQuickProcessingDto> busiQualityRectificationPages = busiQualityQuickProcessService.getAllBusiQualityQuickProcessPage(queryPage);
       log.debug("get busiQualityRectification size @" + busiQualityRectificationPages.getContent().size());
       return new ResponseEntity<>(busiQualityRectificationPages, HttpStatus.OK);
    }
    
     /** 
    * @Title: createBusiQualityRectificationDto 
    * @Description: 添加BusiQualityRectification 
    * @param    busiQualityRectificationDto
    * @return   ResponseEntity<ResponseMessage>    
    * @throws   Exception
    */ 
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ResponseMessage> createBusiQualityRectificationDto(@RequestBody BusiQualityQuickProcessingDto busiQualityRectificationDto) throws Exception {
    	busiQualityQuickProcessService.saveBusiQualityQuickProcessDto(busiQualityRectificationDto);
        return new ResponseEntity<>(ResponseMessage.success("BusiQualityRectification创建成功"), HttpStatus.CREATED);
    }
    
    /**
     * @throws BusinessCheckException  
    * @Title: getBusiQualityQuickProcessingDto 
    * @Description: 获取快捷处理信息通过编号id
    * @createDate: 2016年4月25日 下午1:49:40
    * @param    id
    * @return   ResponseEntity<BusiQualityQuickProcessingDto>    
    * @throws 
    */ 
    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<BusiQualityQuickProcessingDto> getBusiQualityQuickProcessingDto(@PathVariable("id") Long id) throws BusinessCheckException {
    	BusiQualityQuickProcessingDto busiQualityRectificationDto = busiQualityQuickProcessService.getBusiQualityQuickProcessingDtoById(id);
        return new ResponseEntity<BusiQualityQuickProcessingDto>(busiQualityRectificationDto, HttpStatus.OK);
    }
    
    /** 
    * @Title: editBusiQualityRectification 
    * @Description:修改BusiQualityRectification信息 
    * @createDate: 2016年4月25日 下午1:49:25
    * @param    id
    * @param    busiQualityRectificationDto
    * @return   ResponseEntity<ResponseMessage>    
    * @throws 
    */ 
    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ResponseMessage> editBusiQualityRectification(@PathVariable("id") Long id, @RequestBody BusiQualityQuickProcessingDto busiQualityQuickProcessingDto) throws Exception {
    	busiQualityQuickProcessService.updateBusiQualityRectification(id, busiQualityQuickProcessingDto);
        return new ResponseEntity<>(ResponseMessage.success("修改成功"), HttpStatus.OK);
    }

    /** 
    * @Title: deleteBusiQualityRectificationById 
    * @Description: 根据ID删除MdmLineBaseInfo信息. 
    * @param   id
    * @return  ResponseEntity<ResponseMessage>    
    * @throws  Exception
    */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ResponseMessage> deleteBusiQualityRectificationById(@PathVariable("id") Long id) throws Exception {
    	busiQualityQuickProcessService.deleteBusiQualityRectification(id);
        return new ResponseEntity<>(ResponseMessage.success("删除成功"), HttpStatus.OK);
    }
    
    /**
     * @throws BusinessCheckException  
     * @Title: getBusiQualityRectificationDto 
     * @Description: 获取需要整改单通过整改单编号
     * @createDate: 2016年4月25日 下午1:49:40
     * @param    rectificationCode 整改单编号
     * @return   ResponseEntity<BusiQualityRectificationDto>    
     * @throws 
     */ 
     @RequestMapping(value = "/queryRectification/{rectificationCode}", method = RequestMethod.GET)
     @ResponseBody
     public ResponseEntity<BusiQualityQuickProcessingDto> getBusiQualityRectificationDtoByRectificationCode(@PathVariable("rectificationCode") String rectificationCode) throws BusinessCheckException {
    	 BusiQualityQuickProcessingDto busiQualityQuickProcessingDto = busiQualityQuickProcessService.getBusiQualityQuickProcessByCode(rectificationCode);
     	return new ResponseEntity<BusiQualityQuickProcessingDto>(busiQualityQuickProcessingDto, HttpStatus.OK);
     }
}
