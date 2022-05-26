package com.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import com.google.api.services.analyticsreporting.v4.AnalyticsReportingScopes;
import com.google.api.services.analytics.AnalyticsScopes;
import com.google.api.services.analyticsreporting.v4.AnalyticsReporting;

import com.google.api.services.analyticsreporting.v4.model.ColumnHeader;
import com.google.api.services.analyticsreporting.v4.model.DateRange;
import com.google.api.services.analyticsreporting.v4.model.DateRangeValues;
import com.google.api.services.analyticsreporting.v4.model.GetReportsRequest;
import com.google.api.services.analyticsreporting.v4.model.GetReportsResponse;
import com.google.api.services.analyticsreporting.v4.model.Metric;
import com.google.api.services.analyticsreporting.v4.model.Dimension;
import com.google.api.services.analyticsreporting.v4.model.MetricHeaderEntry;
import com.google.api.services.analyticsreporting.v4.model.Report;
import com.google.api.services.analyticsreporting.v4.model.ReportRequest;
import com.google.api.services.analyticsreporting.v4.model.ReportRow;
import com.google.auth.oauth2.GoogleCredentials;

/**
 * A simple example of how to access the Google Analytics API.
 */
public class HelloAnalyticsReporting {
  // Path to client_secrets.json file downloaded from the Developer's Console.
  // The path is relative to HelloAnalytics.java.
  private static final String CLIENT_SECRET_JSON_RESOURCE = "E:\\job\\clubtrabajo\\clubtrabajo\\src\\main\\java\\com\\service\\ClubdelTrabajo_cc32dc2fba1d.json";

  // Replace with your view ID.
  private static final String VIEW_ID = "232161926";

  // The directory where the user's credentials will be stored.
  private static final File DATA_STORE_DIR = new File(
      System.getProperty("user.home"), ".store/hello_analytics");

  private static final String APPLICATION_NAME = "ClubdelTrabajo";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  private static NetHttpTransport httpTransport;
  private static FileDataStoreFactory dataStoreFactory;

  public static String main() {
    try {
      System.out.println("---saveMer1---------------------");
      AnalyticsReporting service = initializeAnalyticsReporting();
      System.out.println("---saveMer2---------------------");
      GetReportsResponse response = getReport(service);
      System.out.println("---saveMer3---------------------");
      return printResponse(response);
    } catch (Exception e) {
      e.printStackTrace();
      return e.toString();
    }
  }


  /**
   * Initializes an authorized Analytics Reporting service object.
   *
   * @return The analytics reporting service object.
   * @throws IOException
   * @throws GeneralSecurityException
   */
  private static AnalyticsReporting initializeAnalyticsReporting() throws GeneralSecurityException, IOException {
    System.out.println("---saveMer11---------------------");
    // httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    // System.out.println("---saveMer12---------------------");
    // dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);
    // System.out.println("---saveMer13---------------------");
    // // Load client secrets.
    // FileInputStream in=new FileInputStream(new File("src/main/java/com/service/client_secret.json"));
    //     System.out.println("---saveMer14---------------------"+in);
    // GoogleClientSecrets clientSecrets =
    //         GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
    // System.out.println("---saveMer15---------------------"+clientSecrets);
    // // GoogleClientSecrets.Details det = new GoogleClientSecrets.Details();
    // // det.setClientId("my id");
    // // det.setClientSecret("my secret");
    // // det.setRedirectUris(Arrays.asList("urn:ietf:wg:oauth:2.0:oob"));
    // // clientSecrets.setInstalled(det);
    // // GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
    // //     new InputStreamReader(HelloAnalyticsReporting.class
    // //         .getResourceAsStream("src\\main\\java\\com\\service\\client_secret.json")));
    // // System.out.println("---saveMer14---------------------");

    // // Set up authorization code flow for all authorization scopes.
    // System.out.println("---saveMer16---------------------"+httpTransport);
    // GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow
    //     .Builder(httpTransport, JSON_FACTORY, clientSecrets,
    //         AnalyticsReportingScopes.all()).setDataStoreFactory(dataStoreFactory)
    //         // .setAccessType("offline")
    //         // .setApprovalPrompt("auto")
    //     .build();
    HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    GoogleCredential credential = GoogleCredential
        .fromStream(new FileInputStream(new File("src/main/java/com/service/client_secret2.json")))
        .createScoped(AnalyticsScopes.all());
    // System.out.println("---saveMer17---------------------"+flow);
    // Authorize.
    // Credential credential = new AuthorizationCodeInstalledApp(flow,
    //     new LocalServerReceiver.Builder().setPort(10047).build()).authorize("clubdeltrabajo2020@gmail.com");
        System.out.println("---saveMer18---------------------");
    // Construct the Analytics Reporting service object.
    return new AnalyticsReporting.Builder(httpTransport, JSON_FACTORY, credential)
        .setApplicationName(APPLICATION_NAME).build();
  }

  /**
   * Query the Analytics Reporting API V4.
   * Constructs a request for the sessions for the past seven days.
   * Returns the API response.
   *
   * @param service
   * @return GetReportResponse
   * @throws IOException
   */
  private static GetReportsResponse getReport(AnalyticsReporting service) throws IOException {
    // Create the DateRange object.
    DateRange dateRange = new DateRange();
    dateRange.setStartDate("14DaysAgo");
    dateRange.setEndDate("today");

    // Create the Metrics object.
    Metric sessions = new Metric()
        .setExpression("ga:sessions")
        .setAlias("sessions");

    //Create the Dimensions object.
    Dimension browser = new Dimension()
        .setName("ga:browser");

    // Create the ReportRequest object.
    ReportRequest request = new ReportRequest()
        .setViewId(VIEW_ID)
        .setDateRanges(Arrays.asList(dateRange))
        .setDimensions(Arrays.asList(browser))
        .setMetrics(Arrays.asList(sessions));

    ArrayList<ReportRequest> requests = new ArrayList<ReportRequest>();
    requests.add(request);

    // Create the GetReportsRequest object.
    GetReportsRequest getReport = new GetReportsRequest()
        .setReportRequests(requests);

    // Call the batchGet method.
    GetReportsResponse response = service.reports().batchGet(getReport).execute();

    // Return the response.
    return response;
  }

  /**
   * Parses and prints the Analytics Reporting API V4 response.
   *
   * @param response the Analytics Reporting API V4 response.
   */
  private static String printResponse(GetReportsResponse response) {

    List<DateRangeValues> total = response.getReports().get(0).getData().getTotals();
    return total.get(0).getValues().get(0);
    // for (Report report: response.getReports()) {
    //   ColumnHeader header = report.getColumnHeader();
    //   List<String> dimensionHeaders = header.getDimensions();
    //   List<MetricHeaderEntry> metricHeaders = header.getMetricHeader().getMetricHeaderEntries();
    //   List<ReportRow> rows = report.getData().getRows();
    //   List<DateRangeValues> totals = report.getData().getTotals();

    //   if (rows == null) {
    //      System.out.println("No data found for " + VIEW_ID);
    //      return "0";
    //   }

    //   // for (ReportRow row: rows) {
    //   //   List<String> dimensions = row.getDimensions();
    //   //   List<DateRangeValues> metrics = row.getMetrics();
    //   //   for (int i = 0; i < dimensionHeaders.size() && i < dimensions.size(); i++) {
    //   //     System.out.println(dimensionHeaders.get(i) + ": " + dimensions.get(i));
    //   //   }

    //   //   for (int j = 0; j < metrics.size(); j++) {
    //   //     System.out.print("Date Range (" + j + "): ");
    //   //     DateRangeValues values = metrics.get(j);
    //   //     for (int k = 0; k < values.getValues().size() && k < metricHeaders.size(); k++) {
    //   //       System.out.println(metricHeaders.get(k).getName() + ": " + values.getValues().get(k));
    //   //     }
    //   //   }
    //   // }
    //   System.out.print("Tooootal (" + totals.get(0).getValues().get(0) + "): ");
    // }
  }
}