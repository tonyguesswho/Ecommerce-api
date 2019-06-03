import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const orderEmail = async (user, details) => {
  const msg = {
    to: `${user.email}`,
    from: 'admin@tshirtshop.com',
    subject: 'Successful Order Placement',
    html: `<strong>Thanks for the order</strong>
    <p>Here are your order details</p>
    <p>Total Amount : ${details[0].total_amount}</p>
    <p>Shipping Type : ${details[0].shipping_type}</p>
    <p>Shipping Cost : ${details[0].shipping_cost}</p>
    <p>Tax Type : ${details[0].tax_type}</p>
    <p>Tax Percentage : ${details[0].tax_percentage}</p>
    `,
  };
  await sgMail.send(msg);
};

export default orderEmail;
