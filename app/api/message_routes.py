from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Review, db, User
from app.forms import ReviewForm
from flask_login import login_required, current_user


# post a review
@review_routes.route('/<int:product_id>/reviews', methods=['POST'])
def create_review(product_id):
  # print('backend', product_id)
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review = Review()
    form.populate_obj(review)
    db.session.add(review)
    db.session.commit()
    print("review dict-------------", review.to_dict())
    return {"review":review.to_dict()}
  else:
    return "bad data"

# get all reviews for a product
# @review_routes.route('/<int:id>', methods=['GET'])
@review_routes.route('/<int:product_id>/reviews', methods=['GET'])
def get_review(product_id):
  reviews = Review.query.filter(Review.product_id == product_id).all()
  # print("all reviews", reviews)
  return {review.id: review.to_dict() for review in reviews}
