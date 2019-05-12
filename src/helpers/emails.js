import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const orderEmail = async (user) => {
  const msg = {
    to: `${user.email}`,
    from: 'admin@tshirtshop.com',
    subject: 'Successful Order Placement',
    html: '<strong>Thanks for the order</strong>',
  };
  await sgMail.send(msg);
};

export default orderEmail;
