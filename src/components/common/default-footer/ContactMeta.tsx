import React from "react";

interface ContactInfo {
  title: string;
  phone?: string;
  phoneLink?: string;
  mail?: string;
  mailLink?: string;
}

const ContactMeta: React.FC = () => {
  const contactInfoList: ContactInfo[] = [
    {
      title: "Total Free Customer Care",
      phone: "+(0) 123 050 945 02",
      phoneLink: "tel:+012305094502",
    },
    {
      title: "Need Live Support?",
      mail: "hi@flapabay.com",
      mailLink: "mailto:hi@flapabay.com",
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta; 