package org.jahr.backend.issue.client;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.jahr.backend.Email;
import org.jahr.backend.issue.model.Issue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Component
public class IssueBlobClient {

    @Value("${BLOB_CONNECTION_STRING}")
    private String blobConnectionString;

    @Value("${BLOB_CONTAINER_NAME}")
    private String blobContainerName;

    public Issue uploadIssueImages(Issue issue) {
        BlobServiceClient blobServiceClient =
                new BlobServiceClientBuilder().connectionString(blobConnectionString).buildClient();
        BlobContainerClient blobContainerClient =
                blobServiceClient.getBlobContainerClient(blobContainerName);
        blobContainerClient.createIfNotExists();

        // This should already be a list in issue object
        List<String> issueImagesData = Arrays.asList(issue.getImgRef().split(","));
        List<String> issueImagesNames = new ArrayList<>();

        for (int i = 0; i < issueImagesData.size(); i++) {
            String blobName = ("" + issue.getId()) + i + ".png";
            issueImagesNames.add(blobName);
            try {
                String imgDataString = issueImagesData.get(i);
                byte[] imgDataBytes = Base64.getDecoder().decode(imgDataString);
                InputStream inputStream = new ByteArrayInputStream(imgDataBytes);

                BlobClient blobClient = blobContainerClient.getBlobClient(blobName);
                blobClient.upload(inputStream);

                inputStream.close();
            } catch (IOException e) {
                throw new IllegalStateException("Could not convert and upload image data");
            }
        }

        // This should actually be the whole array
//        issue.setImgRef(issueImagesNames.get(0));
        issue.setImgRef(String.join(",", issueImagesNames));
        return issue;
    }

    public String getIssueImages(Issue issue) {
        BlobServiceClient blobServiceClient =
                new BlobServiceClientBuilder().connectionString(blobConnectionString).buildClient();

        BlobContainerClient blobContainerClient =
                blobServiceClient.getBlobContainerClient(blobContainerName);
        blobContainerClient.createIfNotExists();

        // This should already be a list in issue object
//        List<String> issueImagesNames = List.of(issue.getImgRef());
        List<String> issueImagesNames = Arrays.asList(issue.getImgRef().split(","));
        List<String> issueImagesData = new ArrayList<>();

        for (int i = 0; i < issueImagesNames.size(); i++) {
            String blobName = ("" + issue.getId()) + i + ".png";
            BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            blobClient.downloadStream(outputStream);

            String imgData = Base64.getEncoder().encodeToString(outputStream.toByteArray());

            issueImagesData.add(imgData);
        }

        // Should be entire list
        return String.join(",", issueImagesData);
    }

    public void getIssueImagesByList(List<String> images, int id, Email email, String title)
            throws MessagingException {
        BlobServiceClient blobServiceClient =
                new BlobServiceClientBuilder().connectionString(blobConnectionString).buildClient();

        BlobContainerClient blobContainerClient =
                blobServiceClient.getBlobContainerClient(blobContainerName);
        blobContainerClient.createIfNotExists();

        // This should already be a list in issue object
//        List<String> issueImagesNames = List.of(issue.getImgRef());
        List<String> issueImagesData = new ArrayList<>();

        for (int i = 0; i < images.size(); i++) {
            String blobName = ("" + id) + i + ".png";
            BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            blobClient.downloadStream(outputStream);

            String imgData = Base64.getEncoder().encodeToString(outputStream.toByteArray());

            issueImagesData.add(imgData);
        }
        email.addImgToEmail(String.join(",", issueImagesData), id, title);
    }
}



