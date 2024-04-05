package org.jahr.backend;

import com.azure.communication.email.EmailClient;
import com.azure.communication.email.EmailClientBuilder;
import com.azure.communication.email.models.EmailAttachment;
import com.azure.communication.email.models.EmailMessage;
import com.azure.communication.email.models.EmailSendResult;
import com.azure.core.util.BinaryData;
import com.azure.core.util.polling.PollResponse;
import com.azure.core.util.polling.SyncPoller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class Email {
//    Session newSession = null;
//    MimeMessage mimeMessage = null;
//    //    EmailMessage message = null;
//    MimeMultipart multipart = new MimeMultipart();

    @Value("${email.connection.string}")
    private String connectionString;

    public void sendEmail(EmailMessage message) {
        EmailClient emailClient =
                new EmailClientBuilder().connectionString(connectionString).buildClient();
        SyncPoller<EmailSendResult, EmailSendResult> poller = emailClient.beginSend(message);
        PollResponse<EmailSendResult> response = poller.waitForCompletion();

        System.out.println("Azure email response = " + response.getValue().getId());

//        Dotenv dotenv = null;
//        dotenv = Dotenv.configure().load();
//        String user = dotenv.get("EMAIL_USER");
//        String userPassword = dotenv.get("EMAIL_PASSWORD");
//        String emailHost = "smtp.gmail.com";
//        Transport transport = newSession.getTransport("smtp");
//        transport.connect(emailHost, user, userPassword);
//        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
//        transport.close();
    }

    public EmailMessage draftEmailMessage(
            String[] recipients, String body, String title, List<EmailAttachment> attachments
    ) {
//        String[] emailRecipients = recipients.split(",");
        String emailSubject = "Report from inspection " + title;
        return new EmailMessage().setSenderAddress(
                        "DoNotReply@1c52ece2-5066-400d-9008-8d714c8f32d2.azurecomm.net")
                .setToRecipients(recipients)
                .setSubject(emailSubject)
                .setBodyHtml(body)
                .setAttachments(attachments);
    }

    public List<EmailAttachment> formatMessageImages(
            List<String> base64Images, String title
    ) {
//        String[] base64Images = base64ImageStrings.split(",");
        List<EmailAttachment> images = new ArrayList<>();
        for (int i = 0; i < base64Images.size(); i++) {
            byte[] rawImage = Base64.getDecoder().decode(base64Images.get(i));
            BinaryData binaryImage = BinaryData.fromBytes(rawImage);
            EmailAttachment attachment =
                    new EmailAttachment(title + i + ".png", "text/plain", binaryImage);
            images.add(attachment);
        }
        return images;
    }

//    public MimeMessage draftEmail(String emails, String body, String title)
//            throws MessagingException, IOException {
//        String[] emailRecipients = emails.split(",");
//        String emailSubject = "Report from inspection " + title;
//        mimeMessage = new MimeMessage(newSession);
//        Arrays.stream(emailRecipients).forEach(el -> {
//            try {
//                mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(el));
//            } catch (MessagingException e) {
//                throw new RuntimeException(e);
//            }
//        });
//        mimeMessage.setSubject(emailSubject);
//        MimeBodyPart bodyPart = new MimeBodyPart();
//        bodyPart.setContent(body, "text/html; charset=utf-8");
////        MimeBodyPart attachmentPart = new MimeBodyPart();
////        attachmentPart.attachFile(new File(""));
//        multipart.addBodyPart(bodyPart);
//        mimeMessage.setContent(multipart);
//        return mimeMessage;
//    }

//    public void addImgToEmail(String base64ImageStrings, int id, String title)
//            throws MessagingException {
//        String[] base64Image = base64ImageStrings.split(",");
//        for (int i = 0; i < base64Image.length; i++) {
//            byte[] rawImage = Base64.getDecoder().decode(base64Image[i]);
//            BodyPart imagePart = new MimeBodyPart();
//            ByteArrayDataSource imageDataSource = new ByteArrayDataSource(rawImage, "image/png");
//            imagePart.setDataHandler(new DataHandler(imageDataSource));
//            imagePart.setHeader("Content-ID", "<" + title + i + ">");
//            imagePart.setFileName(title + i + ".png");
//            multipart.addBodyPart(imagePart);
//        }
//    }
//
//    public void setUpServerProperties() {
//        Properties prop = System.getProperties();
//        prop.put("mail.smtp.auth", true);
//        prop.put("mail.smtp.starttls.enable", "true");
//        prop.put("mail.smtp.port", "587");
//        newSession = Session.getDefaultInstance(prop, null);
//    }
}
