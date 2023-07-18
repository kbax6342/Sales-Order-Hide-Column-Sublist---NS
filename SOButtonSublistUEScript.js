/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/record', 'N/recordContext', 'N/redirect', 'N/render', 'N/search', 'N/ui/message', 'N/ui/serverWidget', 'N/runtime'],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{recordContext} recordContext
 * @param{redirect} redirect
 * @param{render} render
 * @param{search} search
 * @param{message} message
 */
    (currentRecord, record, recordContext, redirect, render, search, message, serverWidget, runtime) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

            try{
                const userObj = runtime.getCurrentUser();
                const {record} = scriptContext;
                log.debug("This is a user", userObj)

                if(userObj.role === 1047){
                    var schoolName = record.getSublistValue({
                        sublistId: 'item',
                        fieldId: '"custcol_lf_school_name',
                        line: 1
                    });

                    if(!schoolName){
                        hideColumnField(scriptContext.form , 'item', 'custcol_lf_school_name')
                    }

                    hideColumnField(scriptContext.form , 'item', 'custcol_lf_follett_retail')
                }

                if(userObj.department === 4){
                    hideColumnField(scriptContext.form , 'item', 'class')
                    hideColumnField(scriptContext.form, 'item', 'department')
                }
            }catch (e) {
                log.error({
                    title: 'BeforLoad Error',
                    details: e
                });
            }

        }

        function hideColumnField(formObj, sublistId, fieldId) {

            try {
                const formSublist = formObj.getSublist({
                    id: sublistId
                });

                const formField = formSublist.getField({
                        id: fieldId
                    });

                if (formField && typeof formField !== 'undefined' && formField !== null) {
                    formField.updateDisplayType({
                        displayType: serverWidget.FieldDisplayType.HIDDEN
                    });
                }

            } catch(error) {
                log.error({
                    title: 'Error occurred when hiding field',
                    details: error
                });
            }
        }



        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
