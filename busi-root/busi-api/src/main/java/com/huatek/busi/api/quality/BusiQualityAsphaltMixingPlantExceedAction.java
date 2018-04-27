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
import com.huatek.busi.dto.quality.BusiQualityAsphaltMixingPlantExceedDto;
import com.huatek.busi.service.quality.BusiQualityAsphaltMixingPlantExceedService;
import com.huatek.frame.core.ResponseMessage;
import com.huatek.frame.core.page.DataPage;
import com.huatek.frame.core.page.QueryPage;

@RestController
@RequestMapping(value = BusiUrlConstants.BUSIQUALITYASPHALTMIXINGPLANTEXCEED_API)
public class BusiQualityAsphaltMixingPlantExceedAction {

    private static final Logger log = LoggerFactory.getLogger(BusiQualityAsphaltMixingPlantExceedAction.class);

    @Autowired
    private BusiQualityAsphaltMixingPlantExceedService busiQualityAsphaltMixingPlantExceedService;

    
    /** 
    * @Title: getAllBusiQualityAsphaltMixingPlantExceed 
    * @Description:  翻页查询BusiQualityAsphaltMixingPlantExceed信息.
    * @param   queryPage
    * @return  ResponseEntity<DataPage<BusiQualityAsphaltMixingPlantExceedDto>>    
    * @throws  JsonParseException
    * @throws  JsonMappingException
    * @throws  IOException 
    */
    @RequestMapping(value = "/query")
    @ResponseBody
    public ResponseEntity<DataPage<BusiQualityAsphaltMixingPlantExceedDto>> getAllBusiQualityAsphaltMixingPlantExceed(@RequestBody QueryPage queryPage) throws JsonParseException, JsonMappingException, IOException { 	
        DataPage<BusiQualityAsphaltMixingPlantExceedDto> busiQualityAsphaltMixingPlantExceedPages = busiQualityAsphaltMixingPlantExceedService.getAllBusiQualityAsphaltMixingPlantExceedPage(queryPage);
        return new ResponseEntity<>(busiQualityAsphaltMixingPlantExceedPages, HttpStatus.OK);
       
    }
    
     /** 
    * @Title: createBusiQualityAsphaltMixingPlantExceedDto 
    * @Description: 添加BusiQualityAsphaltMixingPlantExceed 
    * @param    busiQualityAsphaltMixingPlantExceedDto
    * @return   ResponseEntity<ResponseMessage>    
    * @throws   Exception
    */ 
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ResponseMessage> createBusiQualityAsphaltMixingPlantExceedDto(@RequestBody BusiQualityAsphaltMixingPlantExceedDto busiQualityAsphaltMixingPlantExceedDto) throws Exception {
        busiQualityAsphaltMixingPlantExceedService.saveBusiQualityAsphaltMixingPlantExceedDto(busiQualityAsphaltMixingPlantExceedDto);
        return new ResponseEntity<>(ResponseMessage.success("BusiQualityAsphaltMixingPlantExceed创建成功"), HttpStatus.CREATED);
    }
    
    /** 
    * @Title: getBusiQualityAsphaltMixingPlantExceedDto 
    * @Description: 获取需要修改 MdmLineBaseInfo信息
    * @createDate: 2016年4月25日 下午1:49:40
    * @param    id
    * @return   ResponseEntity<BusiQualityAsphaltMixingPlantExceedDto>    
    * @throws 
    */ 
    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<BusiQualityAsphaltMixingPlantExceedDto> getBusiQualityAsphaltMixingPlantExceedDto(@PathVariable("id") Long id) {
    	BusiQualityAsphaltMixingPlantExceedDto busiQualityAsphaltMixingPlantExceedDto = busiQualityAsphaltMixingPlantExceedService.getBusiQualityAsphaltMixingPlantExceedDtoById(id);
        return new ResponseEntity<>(busiQualityAsphaltMixingPlantExceedDto, HttpStatus.OK);
    }
    
    /** 
    * @Title: editBusiQualityAsphaltMixingPlantExceed 
    * @Description:修改BusiQualityAsphaltMixingPlantExceed信息 
    * @createDate: 2016年4月25日 下午1:49:25
    * @param    id
    * @param    busiQualityAsphaltMixingPlantExceedDto
    * @return   ResponseEntity<ResponseMessage>    
    * @throws 
    */ 
    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ResponseMessage> editBusiQualityAsphaltMixingPlantExceed(@PathVariable("id") Long id, @RequestBody BusiQualityAsphaltMixingPlantExceedDto busiQualityAsphaltMixingPlantExceedDto) throws Exception {
        busiQualityAsphaltMixingPlantExceedService.updateBusiQualityAsphaltMixingPlantExceed(id, busiQualityAsphaltMixingPlantExceedDto);
        return new ResponseEntity<>(ResponseMessage.success("修改成功"), HttpStatus.OK);
    }

    /** 
    * @Title: deleteBusiQualityAsphaltMixingPlantExceedById 
    * @Description: 根据ID删除MdmLineBaseInfo信息. 
    * @param   id
    * @return  ResponseEntity<ResponseMessage>    
    * @throws  Exception
    */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ResponseMessage> deleteBusiQualityAsphaltMixingPlantExceedById(@PathVariable("id") Long id) throws Exception {
        busiQualityAsphaltMixingPlantExceedService.deleteBusiQualityAsphaltMixingPlantExceed(id);
        return new ResponseEntity<>(ResponseMessage.success("删除成功"), HttpStatus.OK);
    }
}
