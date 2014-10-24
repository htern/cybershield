<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <ARCHERRECORDS>
            <xsl:for-each select="NessusClientData_v2/Report/ReportHost/ReportItem">
                <ARCHERRECORD>
                    <PolicyNAME>
                        <xsl:value-of select="../../../Policy/policyName"/>
                    </PolicyNAME>
                    <ReportHost>
                        <xsl:value-of select="../@name"/>
                    </ReportHost>
                    <Port>
                        <xsl:value-of select="@port"/>
                    </Port>
                    <svc_name>
                        <xsl:value-of select="@svc_name"/>
                    </svc_name>
                    <protocol>
                        <xsl:value-of select="@protocol"/>
                    </protocol>
                    <Severity>
                        <xsl:value-of select="@severity"/>
                    </Severity>
                    <PluginID>
                        <xsl:value-of select="@pluginID"/>
                    </PluginID>
                    <PluginName>
                        <xsl:value-of select="@pluginName"/>
                    </PluginName>
                    <description>
                        <xsl:value-of select="description"/>
                    </description>
                    <solution>
                        <xsl:value-of select="solution"/>
                    </solution>
                    <synopsis>
                        <xsl:value-of select="synopsis"/>
                    </synopsis>
                </ARCHERRECORD>

            </xsl:for-each>
        </ARCHERRECORDS>
    </xsl:template>
 
   
</xsl:stylesheet>