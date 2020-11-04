package org.wso2.carbon.apimgt.rest.api.publisher.v1;

import org.wso2.carbon.apimgt.rest.api.publisher.v1.*;
import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.*;

import org.apache.cxf.jaxrs.ext.MessageContext;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;

import org.wso2.carbon.apimgt.api.APIManagementException;

import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.AlertConfigDTO;
import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.AlertConfigListDTO;
import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.ErrorDTO;
import java.util.Map;

import java.util.List;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;


public interface AlertsApiService {
      public Response addAlertConfig(String alertType
, String configurationId
, Map<String, String> body
, MessageContext messageContext) throws APIManagementException;
      public Response deleteAlertConfig(String alertType
, String configurationId
, MessageContext messageContext) throws APIManagementException;
      public Response getAllAlertConfigs(String alertType
, MessageContext messageContext) throws APIManagementException;
}
