package org.jahr.backend;

import io.github.cdimascio.dotenv.Dotenv;

import javax.activation.DataHandler;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.util.ByteArrayDataSource;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Properties;


public class Email {
    Session newSession = null;
    MimeMessage mimeMessage = null;
    MimeMultipart multipart = new MimeMultipart();

    public void sendEmail() throws MessagingException {
        Dotenv dotenv = null;
        dotenv = Dotenv.configure().load();
        String user = dotenv.get("EMAIL_USER");
        String userPassword = dotenv.get("EMAIL_PASSWORD");
        String emailHost = "smtp.gmail.com";
        Transport transport = newSession.getTransport("smtp");
        transport.connect(emailHost, user, userPassword);
        transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
        transport.close();
        System.out.println("Email sent");
    }

    public MimeMessage draftEmail(String emails, String body, String title) throws MessagingException, IOException {
        String[] emailRecipients = emails.split(",");
        String emailSubject = "Report from inspection " + title;
        mimeMessage = new MimeMessage(newSession);
        Arrays.stream(emailRecipients).forEach(el -> {
            System.out.println("email = " + el);
            try {
                mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(el));
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        });
        mimeMessage.setSubject(emailSubject);
        MimeBodyPart bodyPart = new MimeBodyPart();
        bodyPart.setContent(body, "text/html; charset=utf-8");
//        MimeBodyPart attachmentPart = new MimeBodyPart();
//        attachmentPart.attachFile(new File(""));
        multipart.addBodyPart(bodyPart);
        mimeMessage.setContent(multipart);
        return mimeMessage;
    }

    public void addImgToEmail(String base64ImageStrings, int id, String title) throws MessagingException {
        String[] base64Image = base64ImageStrings.split(",");
        for (int i = 0; i < base64Image.length; i++) {
            byte[] rawImage = Base64.getDecoder().decode(base64Image[i]);
            BodyPart imagePart = new MimeBodyPart();
            ByteArrayDataSource imageDataSource = new ByteArrayDataSource(rawImage, "image/png");
            imagePart.setDataHandler(new DataHandler(imageDataSource));
            imagePart.setHeader("Content-ID", "<" + title + i + ">");
            imagePart.setFileName(title + i + ".png");
            multipart.addBodyPart(imagePart);
        }
        System.out.println("multipart = " + multipart.toString());
    }

    public void setUpServerProperties() {
        Properties prop = System.getProperties();
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.port", "587");
        newSession = Session.getDefaultInstance(prop, null);
    }
}
