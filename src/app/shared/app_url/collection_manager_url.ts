export class CollectionManagerUrl {
    // public static selectNewsSource = "collectionmanager/selectNewsSourceByCountryCode";
    // public static addNewNewsSource = "collectionmanager/addNewNewsSourceWithCountryCode";

public static validate_Login = "ui/validateLogin"
public static selectAllMaster="ui/selectAllMaster";

 /*******Avatar Category************/
 public static ADD_NEW_AVATAR_CATEGORY="ui/addNewAvatarCategory";
 public static DELETE_AVATAR_CATEGORY_BYId="ui/deleteAvatarCategoryById";
 public static SELECT_ALL_AVATAR_CATEGORY="ui/selectAllAvatarCategory";
 public static UPDATE_AVATAR_CATEGORY="ui/updateAvatarCategory";

 /*********************Proxy************** */     
 public static add_New_Proxy="ui/addNewProxy";
 public static delete_Proxy_By_Id="ui/deleteProxyById";
 public static select_All_Proxy="ui/selectAllProxy";
 public static select_Proxy_By_Id="ui/selectProxyById";
 public static change_Status_Of_Proxy="ui/changeStatusOfProxy";
 public static update_Proxy="ui/updateProxy";
 
/*********************Avatar************** */     
 public static add_New_Avatar="ui/addNewAvatar";
 public static delete_Avatar_By_Id="ui/deleteAvatarById";
 public static select_All_Avatar="ui/selectAllAvatar";
 public static select_Avatar_By_Id="ui/selectAvatarById";
 public static change_Status_Of_Avatar="ui/changeStatusOfAvatar";
 public static update_Avatar="ui/updateAvatar";

 /*News Category*/
public static add_New_News_Category = "ui/addNewNewsCategory";
public static delete_News_Category_ById = "ui/deleteNewsCategoryById?recordId";
public static select_All_News_Category = "ui/selectAllNewsCategory";

/* News Language */
public static add_News_Language  = "ui/addNewsLanguage"
public static delete_News_Language_ById  = "ui/deleteNewsLanguageById?recordId"
public static select_All_News_Language  = "ui/selectAllNewsLanguage"

/*News Source */
public static add_News_Source = "ui/addNewsSource";
public static delete_News_Source_ById = "ui/deleteNewsSourceById?recordId";
public static select_All_News_Source = "ui/selectAllNewsSource";
public static select_News_Source_ById = "ui/selectNewsSourceById";
public static update_News_Source = "ui/updateNewsSource";
public static update_Status_News_Source = "ui/updateStatusNewsSource";

/**Client Manager**/
public static add_NewClient = "ui/addNewClient";
public static update_Client = "ui/updateClient";
public static delete_ClientById = "ui/deleteClientById";
public static select_AllClient = "ui/selectAllClient";
public static select_ClientById = "ui/selectClientById";

/**Cloud Logs**/
public static loadLoggingType = "logging/loadLoggingType";
public static getApiNamesForType = "logging/getApiNamesForType";
public static getLoggingData = "logging/getLoggingData";
public static loadClientsForLog = "logging/loadClientsForLog"
public static loadSourcesForLog = "logging/loadSourcesForLog"
public static loadProfileTypeForLog = "logging/loadProfileTypeForLog"
public static loadMachineIP = "logging/loadMachineIP"

/**MANAGE JOBS**/
public static collectionLoggedData = "logging/getCollectionLoggingData"
public static collectionJobLoggingData =  "logging/getCollectionJobLoggingData";
public static statusCount = "logging/statusCount";
public static sourceWiseStatusCount = "logging/sourceWiseStatusCount";
public static listCollection="ui/listCollection";
public static listKeywordOfCollection="ui/listKeywordOfCollection";
public static getJobDetail = "ui/getJobDetail";
public static deleteCollection="collectionmanager/deleteCollection";
public static deleteMultipleCollection="collectionmanager/deleteMultipleCollection";
public static updateCollectionPausedStatusById="collectionmanager/updateCollectionPausedStatusById";
public static updateCollectionPausedStatusAll="collectionmanager/updateCollectionPausedStatusAll";
public static showAllKeywordFromSearchList="profilemanager/showAllKeywordFromSearchList";
public static ToRecrawling = "crawling/updateFailureCrawlingStatusToRecrawling"
public static clientWiseCollectionCount = "ui/clientWiseCollectionCount"
public static clientWiseCollectionActiveInactiveCount = "ui/clientWiseCollectionActiveInactiveCount"
public static collectionEntityStatusCountForClient = "ui/collectionEntityStatusCountForClient"
public static collectionEntitySourceWiseStatusCountForClient = "ui/collectionEntitySourceWiseStatusCountForClient"
public static changeReadStatus = "logging/changeReadStatus";
public static getUniqueSources = "ui/getUniqueSources";
public static getUniqueJobNames = "ui/getUniqueJobNames";
public static clientsJobStatusTracking = "ui/clientsJobStatusTracking";
public static clientsJobMigrationTracking = "ui/clientsJobMigrationTracking";
public static clientsJobDateWiseMigratedDocumentCount  = "ui/clientsJobDateWiseMigratedDocumentCount"

public static getCategoryTypeForHeartbeat = "utility/getCategoryTypeForHeartbeat"
public static getJobNameForCategoryType = "utility/getJobNameForCategoryType"
public static getHeartbeat = "utility/getHeartbeat"

}
