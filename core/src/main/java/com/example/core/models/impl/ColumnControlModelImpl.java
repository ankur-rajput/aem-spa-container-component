package com.example.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import com.example.core.models.ColumnControlModel;
import java.util.Map;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Model(adaptables = SlingHttpServletRequest.class,
	   adapters = {ColumnControlModel.class, ComponentExporter.class, ContainerExporter.class},
	   resourceType = ColumnControlModelImpl.RESOURCE_TYPE,
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ColumnControlModelImpl implements ColumnControlModel {

	static final String RESOURCE_TYPE = "aem-spa-container-component/components/columncontrol";

	@ValueMapValue
	@Default(values = "--50")
	private String columnLayout;

	@Self
	@Via(type = ResourceSuperType.class)
	private LayoutContainer layoutContainer;

	@Override
	public String getColumnLayout() {
		return columnLayout;
	}

	@Override
	public Map<String, ? extends ComponentExporter> getExportedItems() {
		return layoutContainer.getExportedItems();
	}

	@Override
	public String[] getExportedItemsOrder() {
		return layoutContainer.getExportedItemsOrder();
	}

	@Override
	public String getExportedType() {
		return ColumnControlModelImpl.RESOURCE_TYPE;
	}
}
