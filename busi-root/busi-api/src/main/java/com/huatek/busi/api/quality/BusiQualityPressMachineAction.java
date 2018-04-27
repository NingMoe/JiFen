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
import com.huatek.busi.dto.quality.BusiQualityPressMachineDto;
import com.huatek.busi.service.quality.BusiQualityPressMachineService;
import com.huatek.frame.core.ResponseMessage;
import com.huatek.frame.core.page.DataPage;
import com.huatek.frame.core.page.QueryPage;

@RestController
@RequestMapping(value = BusiUrlConstants.BUSI_QUALITY_PRESS_MACHINE_API)
public class BusiQualityPressMachineAction {

    private static final Logger log = LoggerFactory
            .getLogger(BusiQualityPressMachineAction.class);

    @Autowired
    private BusiQualityPressMachineService busiQualityPressMachineService;

    
    /** 
    * @Title: getAllBusiQualityPressMachine 
    * @Description:  翻页查询BusiQualityPressMachine信息.
    * @param   queryPage
    * @return  ResponseEntity<DataPage<BusiQualityPressMachineDto>>    
    * @throws  JsonParseException
    * @throws  JsonMappingException
    * @throws  IOException 
    */
    @RequestMapping(value = "/query")
    @ResponseBody
    public ResponseEntity<DataPage<BusiQualityPressMachineDto>> getAllBusiQualityPressMachine(@RequestBody QueryPage queryPage) throws JsonParseException, JsonMappingException, IOException { 	
        DataPage<BusiQualityPressMachineDto> busiQualityPressMachinePages = busiQualityPressMachineService.getAllBusiQualityPressMachinePage(queryPage);
        return new ResponseEntity<>(busiQualityPressMachinePages, HttpStatus.OK);
       
    }
    
    
    /** 
    * @Title: getBusiQualityPressMachineDto 
    * @Description: 获取需要修改 MdmLineBaseInfo信息
    * @createDate: 2016年4月25日 下午1:49:40
    * @param    id
    * @return   ResponseEntity<BusiQualityPressMachineDto>    
    * @throws 
    */ 
    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<BusiQualityPressMachineDto> getBusiQualityPressMachineDto(@PathVariable("id") Long id) {
    	BusiQualityPressMachineDto busiQualityPressMachineDto = busiQualityPressMachineService.getBusiQualityPressMachineDtoById(id);
        return new ResponseEntity<>(busiQualityPressMachineDto, HttpStatus.OK);
    }
    
    /** 
    * @Title: editBusiQualityPressMachine 
    * @Description:修改BusiQualityPressMachine信息 
    * @createDate: 2016年4月25日 下午1:49:25
    * @param    id
    * @param    busiQualityPressMachineDto
    * @return   ResponseEntity<ResponseMessage>    
    * @throws 
    */ 
    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ResponseMessage> editBusiQualityPressMachine(@PathVariable("id") Long id, @RequestBody BusiQualityPressMachineDto busiQualityPressMachineDto) throws Exception {
        busiQualityPressMachineService.updateBusiQualityPressMachine(id, busiQualityPressMachineDto);
        return new ResponseEntity<>(ResponseMessage.success("修改成功"), HttpStatus.OK);
    }

    /** 
    * @Title: deleteBusiQualityPressMachineById 
    * @Description: 根据ID删除MdmLineBaseInfo信息. 
    * @param   id
    * @return  ResponseEntity<ResponseMessage>    
    * @throws  Exception
    */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ResponseMessage> deleteBusiQualityPressMachineById(@PathVariable("id") Long id) throws Exception {
        busiQualityPressMachineService.deleteBusiQualityPressMachine(id);
        return new ResponseEntity<>(ResponseMessage.success("删除成功"), HttpStatus.OK);
    }
}
