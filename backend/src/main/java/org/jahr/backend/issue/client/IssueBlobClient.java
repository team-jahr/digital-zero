package org.jahr.backend.issue.client;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.jahr.backend.issue.model.Issue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
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
        List<String> issueImagesData = List.of(issue.getImgRef());
        List<String> issueImagesNames = new ArrayList<>();

        for (int i = 0; i < issueImagesData.size(); i++) {
            String blobName = ("" + issue.getId()) + i;
            issueImagesNames.add(blobName);
            try {
                InputStream inputStream =
                        new ByteArrayInputStream(issueImagesData.get(i).getBytes());
                BlobClient blobClient = blobContainerClient.getBlobClient(blobName);
                blobClient.upload(inputStream);
                inputStream.close();
            } catch (IOException e) {
                throw new IllegalStateException("Could not convert and upload image data");
            }
        }

        // This should actually be the whole array
        issue.setImgRef(issueImagesNames.get(0));
        return issue;
    }

    public String getIssueImages(Issue issue) {
        BlobServiceClient blobServiceClient =
                new BlobServiceClientBuilder().connectionString(blobConnectionString).buildClient();

        BlobContainerClient blobContainerClient =
                blobServiceClient.getBlobContainerClient(blobContainerName);
        blobContainerClient.createIfNotExists();

        // This should already be a list in issue object
        List<String> issueImagesNames = List.of(issue.getImgRef());
        List<String> issueImagesData = new ArrayList<>();

//        for (int i = 0; i < issueImagesNames.size(); i++) {
//            String blobName = ("" + issue.getId()) + i;
//            try {
//                OutputStream outputStream = new ByteArrayOutputStream();
//                outputStream.write(blobName.getBytes());
//                BlobClient blobClient = blobContainerClient.getBlobClient(blobName);
//                blobClient.downloadStream(outputStream);
//                String imgData = outputStream.toString();
//                issueImagesData.add(imgData);
//            } catch (IOException e) {
//                throw new IllegalStateException("Could not convert and upload image data");
//            }
//        }

        // Should be the for-loop but not all of the data is in the blob so like this for now
        String blobName = "00";
        try {
            OutputStream outputStream = new ByteArrayOutputStream();
            outputStream.write(blobName.getBytes());
            BlobClient blobClient = blobContainerClient.getBlobClient(blobName);
            blobClient.downloadStream(outputStream);
            String imgData = outputStream.toString();
            issueImagesData.add(imgData);
        } catch (IOException e) {
            throw new IllegalStateException("Could not convert and upload image data");
        }

        return issueImagesData.get(0);
    }

}



